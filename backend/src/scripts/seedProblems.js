import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import mongoose from 'mongoose';
import Problem from '../models/Problem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Fix: Node.js may resolve DNS through 127.0.0.1 (no local daemon → ECONNREFUSED).
// Override to Google DNS so Atlas SRV lookups always work.
const currentDns = dns.getServers();
if (currentDns.length === 1 && currentDns[0] === '127.0.0.1') {
  console.log('⚠️  Overriding broken DNS (127.0.0.1) → 8.8.8.8 for Atlas SRV lookup');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const sampleProblems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "easy",
    category: "arrays",
    tags: ["array", "hash-table"],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", expectedOutput: "[0,1]", isHidden: true }
    ],
    starterCode: [
      {
        language: "javascript",
        code: `function twoSum(nums, target) {\n  // Write your code here\n  \n}`
      },
      {
        language: "python",
        code: `def twoSum(nums, target):\n    # Write your code here\n    pass`
      },
      {
        language: "java",
        code: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}`
      }
    ],
    hints: [
      "Try using a hash table to store numbers you've seen",
      "For each number, check if target - number exists in the hash table"
    ],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
  },
  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: "easy",
    category: "linked-lists",
    tags: ["linked-list", "recursion"],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "Reverse the linked list"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
        explanation: "Reverse two nodes"
      }
    ],
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isHidden: false },
      { input: "[1,2]", expectedOutput: "[2,1]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: true }
    ],
    starterCode: [
      {
        language: "javascript",
        code: `function reverseList(head) {\n  // Write your code here\n  \n}`
      },
      {
        language: "python",
        code: `def reverseList(head):\n    # Write your code here\n    pass`
      }
    ],
    hints: [
      "Can you do it iteratively with 3 pointers?",
      "Try a recursive approach - reverse the rest of the list, then append current node"
    ],
    companies: ["Amazon", "Microsoft", "Apple"],
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    difficulty: "easy",
    category: "stacks",
    tags: ["string", "stack"],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'"
    ],
    examples: [
      {
        input: "s = \"()\"",
        output: "true",
        explanation: "Valid parentheses"
      },
      {
        input: "s = \"()[]{}\"",
        output: "true",
        explanation: "All brackets are properly closed"
      },
      {
        input: "s = \"(]\"",
        output: "false",
        explanation: "Mismatched brackets"
      }
    ],
    testCases: [
      { input: "()", expectedOutput: "true", isHidden: false },
      { input: "()[]{}", expectedOutput: "true", isHidden: false },
      { input: "(]", expectedOutput: "false", isHidden: false },
      { input: "([)]", expectedOutput: "false", isHidden: true }
    ],
    starterCode: [
      {
        language: "javascript",
        code: `function isValid(s) {\n  // Write your code here\n  \n}`
      },
      {
        language: "python",
        code: `def isValid(s):\n    # Write your code here\n    pass`
      }
    ],
    hints: [
      "Use a stack to keep track of opening brackets",
      "When you see a closing bracket, check if it matches the last opening bracket in the stack"
    ],
    companies: ["Google", "Facebook", "Amazon"],
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    difficulty: "medium",
    category: "dynamic-programming",
    tags: ["array", "divide-and-conquer", "dynamic-programming"],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      }
    ],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false },
      { input: "[1]", expectedOutput: "1", isHidden: false },
      { input: "[5,4,-1,7,8]", expectedOutput: "23", isHidden: true }
    ],
    starterCode: [
      {
        language: "javascript",
        code: `function maxSubArray(nums) {\n  // Write your code here\n  \n}`
      },
      {
        language: "python",
        code: `def maxSubArray(nums):\n    # Write your code here\n    pass`
      }
    ],
    hints: [
      "Try Kadane's algorithm - keep track of current sum and maximum sum",
      "At each position, decide whether to extend current subarray or start new one"
    ],
    companies: ["Amazon", "Microsoft", "Goldman Sachs"],
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    description: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    difficulty: "easy",
    category: "linked-lists",
    tags: ["linked-list", "recursion"],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merge two sorted lists"
      }
    ],
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
      { input: "[]\n[]", expectedOutput: "[]", isHidden: false }
    ],
    starterCode: [
      {
        language: "javascript",
        code: `function mergeTwoLists(list1, list2) {\n  // Write your code here\n  \n}`
      },
      {
        language: "python",
        code: `def mergeTwoLists(list1, list2):\n    # Write your code here\n    pass`
      }
    ],
    hints: [
      "Use a dummy node to simplify edge cases",
      "Compare values from both lists and pick the smaller one"
    ],
    companies: ["Amazon", "Microsoft", "Apple"],
  },
  {
    title: "Binary Tree Inorder Traversal",
    slug: "binary-tree-inorder-traversal",
    description: "Given the `root` of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "easy",
    category: "trees",
    tags: ["stack", "tree", "depth-first-search"],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "Inorder: left -> root -> right"
      }
    ],
    testCases: [
      { input: "[1,null,2,3]", expectedOutput: "[1,3,2]", isHidden: false },
      { input: "[]", expectedOutput: "[]", isHidden: false }
    ],
    starterCode: [
      {
        language: "javascript",
        code: `function inorderTraversal(root) {\n  // Write your code here\n  \n}`
      },
      {
        language: "python",
        code: `def inorderTraversal(root):\n    # Write your code here\n    pass`
      }
    ],
    hints: [
      "Recursively: traverse left, visit node, traverse right",
      "Iteratively: use a stack to simulate recursion"
    ],
    companies: ["Microsoft", "Amazon"],
  },
];

async function seedProblems() {
  try {
    console.log('🌱 Starting problem seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing problems (optional)
    const existingCount = await Problem.countDocuments();
    console.log(`📊 Found ${existingCount} existing problems`);

    // Insert sample problems
    for (const problemData of sampleProblems) {
      const existing = await Problem.findOne({ slug: problemData.slug });
      
      if (existing) {
        console.log(`⏭️  Skipping "${problemData.title}" - already exists`);
        continue;
      }

      await Problem.create(problemData);
      console.log(`✅ Created "${problemData.title}"`);
    }

    console.log('\n🎉 Problem seeding completed successfully!');
    console.log(`📊 Total problems in database: ${await Problem.countDocuments()}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding problems:', error);
    process.exit(1);
  }
}

seedProblems();
