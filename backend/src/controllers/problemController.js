import Problem from '../models/Problem.js';

export async function getProblems(req, res) {
  try {
    const { 
      difficulty, 
      category, 
      search,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const problems = await Problem.find(query)
      .select('-testCases -solution -__v')  // Exclude hidden fields
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Problem.countDocuments(query);

    res.status(200).json({
      problems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error in getProblems controller:', error);
    res.status(500).json({ message: 'Failed to fetch problems' });
  }
}

export async function getProblemBySlug(req, res) {
  try {
    const { slug } = req.params;

    const problem = await Problem.findOne({ slug, isActive: true })
      .select('-testCases.isHidden -solution -__v');  // Hide test cases and solution

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Return public examples only
    const publicProblem = problem.toObject();
    publicProblem.testCases = problem.testCases.filter(tc => !tc.isHidden);

    res.status(200).json({ problem: publicProblem });
  } catch (error) {
    console.error('Error in getProblemBySlug controller:', error);
    res.status(500).json({ message: 'Failed to fetch problem' });
  }
}

export async function getProblemById(req, res) {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id)
      .select('-testCases -solution -__v');

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Return public test cases only
    const publicProblem = problem.toObject();
    publicProblem.testCases = problem.testCases.filter(tc => !tc.isHidden);

    res.status(200).json({ problem: publicProblem });
  } catch (error) {
    console.error('Error in getProblemById controller:', error);
    res.status(500).json({ message: 'Failed to fetch problem' });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = [
      { value: 'arrays', label: 'Arrays', icon: '📊' },
      { value: 'strings', label: 'Strings', icon: '📝' },
      { value: 'linked-lists', label: 'Linked Lists', icon: '🔗' },
      { value: 'stacks', label: 'Stacks', icon: '📚' },
      { value: 'queues', label: 'Queues', icon: '🎫' },
      { value: 'trees', label: 'Trees', icon: '🌳' },
      { value: 'graphs', label: 'Graphs', icon: '🕸️' },
      { value: 'sorting', label: 'Sorting', icon: '🔄' },
      { value: 'searching', label: 'Searching', icon: '🔍' },
      { value: 'dynamic-programming', label: 'Dynamic Programming', icon: '🧩' },
      { value: 'recursion', label: 'Recursion', icon: '♻️' },
      { value: 'backtracking', label: 'Backtracking', icon: '↩️' },
      { value: 'greedy', label: 'Greedy', icon: '🎯' },
      { value: 'math', label: 'Math', icon: '➗' },
      { value: 'bit-manipulation', label: 'Bit Manipulation', icon: '💾' },
      { value: 'hash-tables', label: 'Hash Tables', icon: '#️⃣' },
      { value: 'heaps', label: 'Heaps', icon: '⛰️' },
      { value: 'two-pointers', label: 'Two Pointers', icon: '👉👉' },
      { value: 'sliding-window', label: 'Sliding Window', icon: '🪟' },
      { value: 'system-design', label: 'System Design', icon: '🏗️' },
    ];

    // Get problem counts per category
    const counts = await Problem.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const countMap = {};
    counts.forEach(c => countMap[c._id] = c.count);

    const categoriesWithCounts = categories.map(cat => ({
      ...cat,
      count: countMap[cat.value] || 0,
    }));

    res.status(200).json({ categories: categoriesWithCounts });
  } catch (error) {
    console.error('Error in getCategories controller:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}

export async function getRandomProblem(req, res) {
  try {
    const { difficulty, category } = req.query;
    
    const query = { isActive: true };
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;

    const count = await Problem.countDocuments(query);
    if (count === 0) {
      return res.status(404).json({ message: 'No problems found matching criteria' });
    }

    const random = Math.floor(Math.random() * count);
    const problem = await Problem.findOne(query)
      .skip(random)
      .select('-testCases -solution -__v');

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Return public test cases only
    const publicProblem = problem.toObject();
    publicProblem.testCases = problem.testCases.filter(tc => !tc.isHidden);

    res.status(200).json({ problem: publicProblem });
  } catch (error) {
    console.error('Error in getRandomProblem controller:', error);
    res.status(500).json({ message: 'Failed to fetch random problem' });
  }
}

// Admin-only endpoints (add authentication check in routes)
export async function createProblem(req, res) {
  try {
    const problemData = req.body;
    
    // Generate slug from title
    if (!problemData.slug) {
      problemData.slug = problemData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const problem = await Problem.create(problemData);
    
    res.status(201).json({ problem });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Problem with this title or slug already exists' });
    }
    console.error('Error in createProblem controller:', error);
    res.status(500).json({ message: 'Failed to create problem' });
  }
}

export async function updateProblem(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const problem = await Problem.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json({ problem });
  } catch (error) {
    console.error('Error in updateProblem controller:', error);
    res.status(500).json({ message: 'Failed to update problem' });
  }
}

export async function deleteProblem(req, res) {
  try {
    const { id } = req.params;

    // Soft delete - mark as inactive
    const problem = await Problem.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProblem controller:', error);
    res.status(500).json({ message: 'Failed to delete problem' });
  }
}
