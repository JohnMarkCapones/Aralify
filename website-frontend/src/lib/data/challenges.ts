export type ChallengeDetail = {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  language: string;
  icon: string;
  description: string;
  constraints: string[];
  hints: string[];
  starterCode: string;
  testCases: { input: string; expected: string; }[];
  solvedBy: number;
  tags: string[];
};

export const challengeDetails: Record<string, ChallengeDetail> = {
  "reverse-linked-list": {
    slug: "reverse-linked-list",
    title: "Reverse a Linked List",
    difficulty: "Medium",
    xp: 200,
    language: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: `Given the head of a singly linked list, reverse the list and return the reversed list.\n\nA linked list can be reversed either iteratively or recursively. Implement both approaches.\n\n**Example:**\n\nInput: 1 -> 2 -> 3 -> 4 -> 5\nOutput: 5 -> 4 -> 3 -> 2 -> 1`,
    constraints: [
      "The number of nodes in the list is in the range [0, 5000]",
      "-5000 <= Node.val <= 5000",
      "Your solution should run in O(n) time",
      "Try to solve it with O(1) extra space",
    ],
    hints: [
      "Think about maintaining three pointers: previous, current, and next.",
      "At each step, reverse the current node's pointer to point to the previous node.",
      "For the recursive approach, think about reversing the rest of the list first.",
    ],
    starterCode: `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head: ListNode) -> ListNode:\n    # Your code here\n    pass`,
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: "[5, 4, 3, 2, 1]" },
      { input: "[1, 2]", expected: "[2, 1]" },
      { input: "[]", expected: "[]" },
    ],
    solvedBy: 342,
    tags: ["Data Structures", "Linked Lists", "Recursion"],
  },
  "binary-search": {
    slug: "binary-search",
    title: "Binary Search Implementation",
    difficulty: "Easy",
    xp: 100,
    language: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: `Given a sorted array of integers and a target value, implement binary search to find the target's index. If the target is not found, return -1.\n\n**Example:**\n\nInput: nums = [-1, 0, 3, 5, 9, 12], target = 9\nOutput: 4`,
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All integers in nums are unique",
      "nums is sorted in ascending order",
    ],
    hints: [
      "Use two pointers (left and right) to define the search range.",
      "Compare the middle element with the target to decide which half to search.",
    ],
    starterCode: `function binarySearch(nums, target) {\n  // Your code here\n}`,
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expected: "4" },
      { input: "[-1,0,3,5,9,12], 2", expected: "-1" },
      { input: "[5], 5", expected: "0" },
    ],
    solvedBy: 891,
    tags: ["Algorithms", "Search", "Arrays"],
  },
  "rest-api-endpoint": {
    slug: "rest-api-endpoint",
    title: "Build a REST API Endpoint",
    difficulty: "Hard",
    xp: 300,
    language: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: `Build a complete REST API endpoint for a user resource that handles CRUD operations with proper validation, error handling, and response formatting.\n\nYour endpoint should:\n- Validate request body using a schema\n- Return proper HTTP status codes\n- Handle errors gracefully\n- Follow REST conventions`,
    constraints: [
      "Use TypeScript with proper type annotations",
      "Validate all input fields",
      "Return appropriate HTTP status codes (200, 201, 400, 404, 500)",
      "Include error messages in a consistent format",
    ],
    hints: [
      "Start by defining your TypeScript interfaces for the request and response.",
      "Use a validation library or write manual checks for required fields.",
      "Remember to handle edge cases like missing fields and invalid data types.",
    ],
    starterCode: `interface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\nfunction handleRequest(method: string, body?: unknown): { status: number; data: unknown } {\n  // Your code here\n}`,
    testCases: [
      { input: 'POST, { name: "John", email: "john@test.com" }', expected: '{ status: 201, data: { id: "...", name: "John", email: "john@test.com" } }' },
      { input: "POST, {}", expected: '{ status: 400, data: { error: "Validation failed" } }' },
      { input: 'GET, undefined', expected: '{ status: 200, data: [...] }' },
    ],
    solvedBy: 156,
    tags: ["Backend", "API Design", "TypeScript"],
  },
};
