
export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image: string;
  duration: string;
  lessons: Lesson[];
  isFeatured?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
}

const coursesData: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Jennifer Lee',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more. This comprehensive course takes you from beginner to professional web developer with hands-on projects and assignments.',
    price: 99.99,
    discountPrice: 49.99,
    rating: 4.8,
    reviewCount: 4253,
    level: 'beginner',
    category: 'Web Development',
    image: '/placeholder.svg',
    duration: '42h 30m',
    isFeatured: true,
    lessons: [
      { id: '1-1', title: 'Introduction to HTML', duration: '45m', content: 'HTML is the standard markup language for web pages. In this lesson, we will cover the basics of HTML structure, tags, attributes, and how to create your first web page.' },
      { id: '1-2', title: 'CSS Fundamentals', duration: '1h 15m', content: 'Learn how to style your HTML documents with CSS. This lesson covers selectors, properties, values, the box model, positioning, and responsive design principles.' },
      { id: '1-3', title: 'JavaScript Basics', duration: '2h', content: 'Introduction to JavaScript programming. We\'ll cover variables, data types, functions, loops, conditionals, and DOM manipulation.' },
    ]
  },
  {
    id: '2',
    title: 'Advanced React and Redux',
    instructor: 'Michael Thompson',
    description: 'Take your React skills to the next level with advanced patterns, hooks, context API, and Redux for state management. Build complex applications with clean architecture.',
    price: 129.99,
    discountPrice: 79.99,
    rating: 4.9,
    reviewCount: 2187,
    level: 'advanced',
    category: 'Web Development',
    image: '/placeholder.svg',
    duration: '28h 15m',
    isFeatured: true,
    lessons: [
      { id: '2-1', title: 'Advanced React Hooks', duration: '1h 30m', content: 'Deep dive into React hooks like useEffect, useContext, useReducer, and creating custom hooks for reusable logic.' },
      { id: '2-2', title: 'Redux Architecture', duration: '2h', content: 'Learn how to implement Redux for state management in React applications. Topics include actions, reducers, store, and middleware.' },
      { id: '2-3', title: 'Performance Optimization', duration: '1h 45m', content: 'Techniques for optimizing React applications including memoization, code splitting, virtualization, and profiling tools.' },
    ]
  },
  {
    id: '3',
    title: 'Data Science Fundamentals with Python',
    instructor: 'Sarah Johnson',
    description: 'Learn the core concepts of data science using Python. This course covers data manipulation, visualization, statistical analysis, and machine learning basics.',
    price: 89.99,
    discountPrice: 59.99,
    rating: 4.7,
    reviewCount: 1856,
    level: 'intermediate',
    category: 'Data Science',
    image: '/placeholder.svg',
    duration: '36h 45m',
    lessons: [
      { id: '3-1', title: 'Python for Data Science', duration: '2h', content: 'Introduction to Python programming for data science. Learn about NumPy, Pandas, and basic data manipulation techniques.' },
      { id: '3-2', title: 'Data Visualization', duration: '1h 30m', content: 'Create stunning data visualizations using Matplotlib and Seaborn. Learn how to choose the right visualization for your data.' },
      { id: '3-3', title: 'Introduction to Machine Learning', duration: '3h', content: 'Learn the fundamentals of machine learning including supervised and unsupervised learning, model evaluation, and basic algorithms.' },
    ]
  },
  {
    id: '4',
    title: 'Mobile App Development with Flutter',
    instructor: 'David Chen',
    description: 'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase with Flutter and Dart.',
    price: 79.99,
    rating: 4.6,
    reviewCount: 1245,
    level: 'intermediate',
    category: 'Mobile Development',
    image: '/placeholder.svg',
    duration: '32h 20m',
    lessons: [
      { id: '4-1', title: 'Dart Programming Basics', duration: '1h 45m', content: 'Introduction to the Dart programming language including syntax, data types, functions, and object-oriented programming concepts.' },
      { id: '4-2', title: 'Flutter Widgets', duration: '2h 30m', content: 'Learn about Flutter widgets, which are the building blocks of Flutter applications. Cover stateless and stateful widgets.' },
      { id: '4-3', title: 'Building Your First App', duration: '3h 15m', content: 'Step-by-step guide to building your first Flutter application from scratch, deploying it to iOS and Android.' },
    ]
  },
  {
    id: '5',
    title: 'AWS Certified Solutions Architect',
    instructor: 'Robert Wilson',
    description: 'Prepare for the AWS Certified Solutions Architect Associate exam. Learn to design available, cost-efficient, fault-tolerant systems on AWS.',
    price: 149.99,
    discountPrice: 99.99,
    rating: 4.9,
    reviewCount: 3578,
    level: 'advanced',
    category: 'Cloud Computing',
    image: '/placeholder.svg',
    duration: '45h 30m',
    isFeatured: true,
    lessons: [
      { id: '5-1', title: 'AWS Fundamentals', duration: '2h', content: 'Introduction to AWS services and the cloud computing model. Overview of regions, availability zones, and global infrastructure.' },
      { id: '5-2', title: 'EC2 and Virtual Networking', duration: '3h', content: 'Deep dive into Amazon EC2 instances, VPC, subnets, security groups, and network ACLs. Learn to design secure network architectures.' },
      { id: '5-3', title: 'Storage Solutions', duration: '2h 30m', content: 'Comprehensive coverage of AWS storage options including S3, EBS, EFS, and Glacier. Learn when to use each storage solution.' },
    ]
  },
  {
    id: '6',
    title: 'UX/UI Design Principles',
    instructor: 'Emily Parker',
    description: 'Learn the fundamental principles of user experience and interface design. Create wireframes, prototypes, and design systems that users love.',
    price: 69.99,
    rating: 4.5,
    reviewCount: 982,
    level: 'beginner',
    category: 'Design',
    image: '/placeholder.svg',
    duration: '24h 10m',
    lessons: [
      { id: '6-1', title: 'Design Thinking Process', duration: '1h 30m', content: 'Introduction to the design thinking methodology including empathize, define, ideate, prototype, and test phases.' },
      { id: '6-2', title: 'Wireframing and Prototyping', duration: '2h', content: 'Learn to create wireframes and interactive prototypes using tools like Figma and Adobe XD.' },
      { id: '6-3', title: 'Usability Testing', duration: '1h 45m', content: 'Methods and best practices for conducting usability tests to validate your designs and gather user feedback.' },
    ]
  },
  {
    id: '7',
    title: 'DevOps and CI/CD Pipeline Implementation',
    instructor: 'Alex Martinez',
    description: 'Master DevOps practices and implement continuous integration and deployment pipelines using Git, Jenkins, Docker, and Kubernetes.',
    price: 119.99,
    discountPrice: 89.99,
    rating: 4.8,
    reviewCount: 1456,
    level: 'advanced',
    category: 'DevOps',
    image: '/placeholder.svg',
    duration: '38h 45m',
    lessons: [
      { id: '7-1', title: 'Introduction to DevOps', duration: '1h', content: 'Overview of DevOps culture, principles, and practices. Learn how DevOps bridges the gap between development and operations.' },
      { id: '7-2', title: 'Docker Containers', duration: '2h 30m', content: 'Learn to containerize applications with Docker. Topics include images, containers, Dockerfiles, and Docker Compose.' },
      { id: '7-3', title: 'CI/CD with Jenkins', duration: '3h', content: 'Implement continuous integration and continuous deployment pipelines using Jenkins. Automate testing and deployment processes.' },
    ]
  },
  {
    id: '8',
    title: 'Blockchain Development with Ethereum',
    instructor: 'Jason Miller',
    description: 'Learn to develop decentralized applications (DApps) on the Ethereum blockchain using Solidity, Web3.js, and Truffle.',
    price: 139.99,
    discountPrice: 99.99,
    rating: 4.7,
    reviewCount: 876,
    level: 'intermediate',
    category: 'Blockchain',
    image: '/placeholder.svg',
    duration: '30h 20m',
    lessons: [
      { id: '8-1', title: 'Blockchain Fundamentals', duration: '2h', content: 'Introduction to blockchain technology, including distributed ledgers, consensus mechanisms, and cryptographic principles.' },
      { id: '8-2', title: 'Smart Contracts with Solidity', duration: '3h 15m', content: 'Learn to write smart contracts using Solidity programming language for the Ethereum blockchain.' },
      { id: '8-3', title: 'Building DApps', duration: '2h 45m', content: 'Develop decentralized applications that interact with the Ethereum blockchain using Web3.js and frontend frameworks.' },
    ]
  }
];

export default coursesData;
