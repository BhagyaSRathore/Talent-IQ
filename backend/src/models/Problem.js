import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  explanation: {
    type: String,
    default: '',
  },
});

const starterCodeSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'java', 'cpp', 'c', 'typescript'],
  },
  code: {
    type: String,
    required: true,
  },
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'arrays',
        'strings',
        'linked-lists',
        'stacks',
        'queues',
        'trees',
        'graphs',
        'sorting',
        'searching',
        'dynamic-programming',
        'recursion',
        'backtracking',
        'greedy',
        'math',
        'bit-manipulation',
        'hash-tables',
        'heaps',
        'two-pointers',
        'sliding-window',
        'system-design',
      ],
    },
    tags: [{
      type: String,
    }],
    constraints: [{
      type: String,
    }],
    examples: [{
      input: String,
      output: String,
      explanation: String,
    }],
    testCases: [testCaseSchema],
    starterCode: [starterCodeSchema],
    hints: [{
      type: String,
    }],
    solution: {
      approach: String,
      timeComplexity: String,
      spaceComplexity: String,
      code: String,
    },
    companies: [{
      type: String,
    }],
    stats: {
      totalAttempts: {
        type: Number,
        default: 0,
      },
      totalSolved: {
        type: Number,
        default: 0,
      },
      acceptanceRate: {
        type: Number,
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
problemSchema.index({ difficulty: 1, category: 1 });
problemSchema.index({ slug: 1 });
problemSchema.index({ tags: 1 });
problemSchema.index({ difficulty: 1, 'stats.acceptanceRate': -1 });
problemSchema.index({ category: 1, difficulty: 1 });

// Virtual for acceptance rate calculation
problemSchema.virtual('calculatedAcceptanceRate').get(function() {
  if (this.stats.totalAttempts === 0) return 0;
  return Math.round((this.stats.totalSolved / this.stats.totalAttempts) * 100);
});

// Method to update stats
problemSchema.methods.updateStats = async function(solved) {
  this.stats.totalAttempts += 1;
  if (solved) {
    this.stats.totalSolved += 1;
  }
  this.stats.acceptanceRate = this.calculatedAcceptanceRate;
  await this.save();
};

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
