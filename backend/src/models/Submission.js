import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: ['javascript', 'python', 'java', 'cpp', 'c', 'typescript'],
    },
    stdin: {
      type: String,
      default: '',
    },
    stdout: {
      type: String,
      default: '',
    },
    stderr: {
      type: String,
      default: '',
    },
    compileOutput: {
      type: String,
      default: '',
    },
    status: {
      id: Number,
      description: String,
    },
    time: {
      type: String,
      default: '0',
    },
    memory: {
      type: Number,
      default: 0,
    },
    exitCode: {
      type: Number,
      default: 0,
    },
    judgeToken: {
      type: String,
      default: '',
    },
    isMock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
submissionSchema.index({ user: 1, createdAt: -1 });
submissionSchema.index({ session: 1, createdAt: -1 });
submissionSchema.index({ user: 1, session: 1 });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
