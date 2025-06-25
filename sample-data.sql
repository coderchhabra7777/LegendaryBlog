-- Sample Data for LegendaryBlog
-- Run this SQL in your Supabase SQL Editor to populate your database with beautiful sample content

-- Insert Sample Authors
INSERT INTO authors (name, email, avatar, bio) VALUES 
(
  'Alex Chen',
  'alex.chen@example.com',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'Full-stack developer passionate about React, Node.js, and modern web technologies. Love sharing knowledge through writing and open source contributions.'
),
(
  'Sarah Johnson',
  'sarah.johnson@example.com',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'UI/UX Designer and Frontend Developer. Specializes in creating beautiful, accessible user experiences. Advocate for inclusive design and web accessibility.'
),
(
  'Marcus Rodriguez',
  'marcus.rodriguez@example.com',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'DevOps Engineer and Cloud Architect. Expert in AWS, Docker, and Kubernetes. Passionate about automation, scalability, and building robust infrastructure.'
),
(
  'Emily Watson',
  'emily.watson@example.com',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'Data Scientist and Machine Learning Engineer. Loves turning complex data into actionable insights. Enthusiast of Python, TensorFlow, and AI ethics.'
),
(
  'David Kim',
  'david.kim@example.com',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'Mobile App Developer specializing in React Native and Flutter. Passionate about creating seamless cross-platform experiences and performance optimization.'
);

-- Insert Sample Blogs
INSERT INTO blogs (title, excerpt, content, cover_image, tags, author_id, views, likes, read_time, featured, published) VALUES 

-- Blog 1: React Best Practices (Featured)
(
  'React Best Practices: Building Scalable Applications in 2024',
  'Discover the latest React patterns and practices that will make your applications more maintainable, performant, and developer-friendly.',
  '# React Best Practices: Building Scalable Applications in 2024

React has evolved significantly over the years, and with it, the best practices for building scalable applications. In this comprehensive guide, we''ll explore the most important patterns and techniques that every React developer should know in 2024.

## 1. Component Composition Over Inheritance

React favors composition over inheritance, and for good reason. Instead of creating complex inheritance hierarchies, we can build flexible components by composing smaller, focused components.

```jsx
// ❌ Avoid complex inheritance
class BaseButton extends Component { /* ... */ }
class PrimaryButton extends BaseButton { /* ... */ }

// ✅ Use composition instead
const Button = ({ variant, children, ...props }) => {
  const baseClasses = "px-4 py-2 rounded font-medium"
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-800"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

## 2. Custom Hooks for Logic Reuse

Custom hooks are one of React''s most powerful features. They allow you to extract component logic into reusable functions.

```jsx
// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
```

## 3. State Management Strategies

Choose the right state management solution for your needs:

- **Local State**: Use `useState` for component-specific state
- **Shared State**: Use Context API for app-wide state
- **Complex State**: Consider Zustand or Redux Toolkit for complex applications

## 4. Performance Optimization

- Use `React.memo` for expensive components
- Implement `useMemo` and `useCallback` judiciously
- Code splitting with `React.lazy` and `Suspense`
- Optimize bundle size with tree shaking

## Conclusion

Following these best practices will help you build React applications that are not only functional but also maintainable and performant. Remember, the key is to start simple and add complexity only when needed.

Happy coding! 🚀',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  ARRAY['React', 'JavaScript', 'Web Development', 'Best Practices'],
  (SELECT id FROM authors WHERE email = 'alex.chen@example.com'),
  1250,
  89,
  8,
  true,
  true
),

-- Blog 2: UI/UX Design
(
  'The Art of Minimalist Web Design: Less is More',
  'Explore how minimalist design principles can create powerful, user-friendly websites that focus on what truly matters.',
  '# The Art of Minimalist Web Design: Less is More

In a world where users are bombarded with information, minimalist web design has emerged as a powerful approach to create clean, focused, and highly effective user experiences.

## What is Minimalist Design?

Minimalist design is about removing the unnecessary and focusing on the essential. It''s not about having less content, but about presenting content in the most effective way possible.

### Key Principles

1. **White Space is Your Friend**
   - Use generous white space to create breathing room
   - Help users focus on important elements
   - Improve readability and comprehension

2. **Typography Matters**
   - Choose fonts that are easy to read
   - Maintain consistent hierarchy
   - Use font weight and size to guide attention

3. **Color with Purpose**
   - Limit your color palette
   - Use color to highlight important actions
   - Ensure sufficient contrast for accessibility

## Benefits of Minimalist Design

### Improved User Experience
- Faster loading times
- Easier navigation
- Reduced cognitive load
- Better mobile experience

### Better Conversion Rates
- Clear call-to-actions stand out
- Fewer distractions lead to better focus
- Simplified user journeys

## Implementation Tips

```css
/* Example: Clean, minimal button design */
.minimal-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.minimal-button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}
```

## Case Studies

Many successful companies have embraced minimalist design:

- **Apple**: Clean product pages that focus on the product
- **Google**: Simple search interface that prioritizes functionality
- **Stripe**: Clear, focused landing pages with minimal distractions

## Common Mistakes to Avoid

1. **Too Much White Space**: Balance is key
2. **Lack of Visual Hierarchy**: Users need guidance
3. **Removing Essential Elements**: Don''t sacrifice functionality
4. **Ignoring Accessibility**: Ensure your design works for everyone

## Conclusion

Minimalist design isn''t about following a trend—it''s about creating better user experiences. By focusing on what''s essential and removing what''s not, we can create websites that are both beautiful and highly functional.

Remember: Good design is as little design as possible, but not less.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
  ARRAY['Design', 'UI/UX', 'Web Design', 'Minimalism'],
  (SELECT id FROM authors WHERE email = 'sarah.johnson@example.com'),
  890,
  67,
  6,
  false,
  true
),

-- Blog 3: DevOps
(
  'Docker Containerization: A Complete Guide for Developers',
  'Master Docker containerization with this comprehensive guide covering everything from basics to advanced deployment strategies.',
  '# Docker Containerization: A Complete Guide for Developers

Docker has revolutionized how we develop, ship, and run applications. This guide will take you from Docker basics to advanced containerization strategies.

## Why Docker?

### The Problem Docker Solves
- "It works on my machine" syndrome
- Environment inconsistencies
- Complex deployment processes
- Resource inefficiency

### Docker Benefits
- **Consistency**: Same environment everywhere
- **Portability**: Run anywhere Docker runs
- **Efficiency**: Lightweight compared to VMs
- **Scalability**: Easy horizontal scaling

## Docker Fundamentals

### Images vs Containers
```bash
# An image is a template
docker build -t my-app .

# A container is a running instance
docker run -p 3000:3000 my-app
```

### Essential Commands
```bash
# Build an image
docker build -t app-name .

# Run a container
docker run -d -p 8080:80 --name my-container app-name

# List running containers
docker ps

# Stop a container
docker stop my-container

# Remove a container
docker rm my-container
```

## Writing Effective Dockerfiles

### Best Practices
```dockerfile
# Use specific base image versions
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

## Multi-Stage Builds

Reduce image size with multi-stage builds:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD ["npm", "start"]
```

## Docker Compose for Multi-Service Applications

```yaml
version: ''3.8''
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis

  db:
    image: postgres:14
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## Production Deployment Strategies

### Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

### Security Best Practices
- Use non-root users
- Scan images for vulnerabilities
- Keep base images updated
- Use secrets management
- Implement proper networking

## Monitoring and Logging

```bash
# View container logs
docker logs -f container-name

# Monitor resource usage
docker stats

# Inspect container details
docker inspect container-name
```

## Conclusion

Docker containerization is essential for modern application development. It provides consistency, portability, and efficiency that traditional deployment methods can''t match.

Start with simple containers and gradually adopt more advanced patterns as your needs grow. The investment in learning Docker will pay dividends in your development workflow and deployment reliability.',
  'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
  ARRAY['Docker', 'DevOps', 'Containerization', 'Deployment'],
  (SELECT id FROM authors WHERE email = 'marcus.rodriguez@example.com'),
  1100,
  78,
  10,
  false,
  true
),

-- Blog 4: Machine Learning
(
  'Introduction to Machine Learning with Python: Your First Steps',
  'Begin your machine learning journey with Python. Learn the fundamentals, essential libraries, and build your first ML model.',
  '# Introduction to Machine Learning with Python: Your First Steps

Machine Learning might seem intimidating at first, but with Python''s rich ecosystem of libraries, getting started is easier than you might think. Let''s embark on this exciting journey together!

## What is Machine Learning?

Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.

### Types of Machine Learning

1. **Supervised Learning**: Learning with labeled examples
   - Classification (predicting categories)
   - Regression (predicting continuous values)

2. **Unsupervised Learning**: Finding patterns in unlabeled data
   - Clustering
   - Dimensionality reduction

3. **Reinforcement Learning**: Learning through interaction and feedback

## Essential Python Libraries

### NumPy: Numerical Computing
```python
import numpy as np

# Create arrays
data = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Mathematical operations
mean = np.mean(data)
std = np.std(data)
```

### Pandas: Data Manipulation
```python
import pandas as pd

# Load data
df = pd.read_csv(''data.csv'')

# Basic operations
print(df.head())
print(df.describe())
print(df.info())

# Data cleaning
df_clean = df.dropna()  # Remove missing values
df[''new_column''] = df[''column1''] * 2
```

### Matplotlib & Seaborn: Data Visualization
```python
import matplotlib.pyplot as plt
import seaborn as sns

# Simple plot
plt.figure(figsize=(10, 6))
plt.plot(x_data, y_data)
plt.title(''My First Plot'')
plt.xlabel(''X-axis'')
plt.ylabel(''Y-axis'')
plt.show()

# Seaborn for statistical plots
sns.scatterplot(data=df, x=''feature1'', y=''target'')
```

### Scikit-learn: Machine Learning
```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, predictions)
```

## Your First ML Project: House Price Prediction

Let''s build a simple house price prediction model:

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Load and explore data
df = pd.read_csv(''house_prices.csv'')
print(df.head())
print(df.info())

# Prepare features and target
features = [''bedrooms'', ''bathrooms'', ''sqft_living'', ''sqft_lot'']
X = df[features]
y = df[''price'']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"R² Score: {r2}")

# Visualize results
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], ''r--'', lw=2)
plt.xlabel(''Actual Prices'')
plt.ylabel(''Predicted Prices'')
plt.title(''Actual vs Predicted House Prices'')
plt.show()
```

## Key Concepts to Remember

### Data Preprocessing
- **Clean your data**: Handle missing values, outliers
- **Feature scaling**: Normalize or standardize features
- **Feature engineering**: Create new meaningful features

### Model Selection
- Start simple (Linear Regression, Decision Trees)
- Gradually move to complex models (Random Forest, Neural Networks)
- Always validate your models properly

### Evaluation Metrics
- **Classification**: Accuracy, Precision, Recall, F1-score
- **Regression**: MSE, RMSE, MAE, R²

## Next Steps

1. **Practice with real datasets**: Kaggle, UCI ML Repository
2. **Learn more algorithms**: Decision Trees, Random Forest, SVM
3. **Explore deep learning**: TensorFlow, PyTorch
4. **Work on projects**: Build a portfolio of ML projects

## Common Pitfalls to Avoid

- **Overfitting**: Model performs well on training but poorly on new data
- **Data leakage**: Using future information to predict the past
- **Ignoring data quality**: Garbage in, garbage out
- **Not validating properly**: Always use separate test sets

## Conclusion

Machine Learning is a powerful tool that can solve complex problems across various domains. Start with the basics, practice regularly, and gradually tackle more challenging projects.

Remember: The key to success in ML is understanding your data and choosing the right approach for your specific problem.

Happy learning! 🤖✨',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
  ARRAY['Machine Learning', 'Python', 'Data Science', 'AI'],
  (SELECT id FROM authors WHERE email = 'emily.watson@example.com'),
  950,
  72,
  12,
  false,
  true
),

-- Blog 5: Mobile Development
(
  'React Native vs Flutter: Choosing the Right Cross-Platform Framework',
  'Compare React Native and Flutter to make an informed decision for your next mobile app project.',
  '# React Native vs Flutter: Choosing the Right Cross-Platform Framework

Choosing between React Native and Flutter for your mobile app can be challenging. Both frameworks offer excellent cross-platform development capabilities, but they have different strengths and use cases.

## React Native: JavaScript-Powered Mobile Development

### Pros
- **Familiar Technology**: Uses JavaScript and React concepts
- **Large Community**: Extensive ecosystem and third-party libraries
- **Code Reuse**: Share logic between web and mobile
- **Hot Reload**: Fast development iteration
- **Native Performance**: Direct access to native APIs

### Cons
- **Bridge Overhead**: Communication between JS and native code
- **Platform-Specific Code**: Sometimes needed for complex features
- **Debugging Complexity**: Can be challenging for native issues

### When to Choose React Native
- You have React/JavaScript expertise
- Need to share code with web applications
- Want access to a mature ecosystem
- Building content-heavy apps

## Flutter: Google''s UI Toolkit

### Pros
- **Single Codebase**: True write-once, run-anywhere
- **Performance**: Compiled to native ARM code
- **Rich UI**: Extensive widget library
- **Hot Reload**: Instant UI updates
- **Growing Ecosystem**: Rapidly expanding package repository

### Cons
- **Learning Curve**: Dart language and Flutter concepts
- **App Size**: Larger bundle sizes
- **Newer Framework**: Smaller community compared to React Native

### When to Choose Flutter
- Building UI-heavy applications
- Need consistent look across platforms
- Want maximum performance
- Starting fresh without existing React knowledge

## Performance Comparison

### React Native Performance
```javascript
// Optimized React Native component
const OptimizedList = React.memo(({ data }) => {
  const renderItem = useCallback(({ item }) => (
    <ListItem key={item.id} data={item} />
  ), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      removeClippedSubviews={true}
    />
  );
});
```

### Flutter Performance
```dart
// Optimized Flutter widget
class OptimizedList extends StatelessWidget {
  final List<Item> items;
  
  const OptimizedList({Key? key, required this.items}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return ListTile(
          key: ValueKey(items[index].id),
          title: Text(items[index].title),
          subtitle: Text(items[index].description),
        );
      },
    );
  }
}
```

## Development Experience

### React Native Setup
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init MyApp

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

### Flutter Setup
```bash
# Install Flutter
git clone https://github.com/flutter/flutter.git

# Create new project
flutter create my_app

# Run on connected device
flutter run

# Build for production
flutter build apk
```

## Code Comparison

### React Native Component
```jsx
import React, { useState } from ''react'';
import { View, Text, TouchableOpacity, StyleSheet } from ''react-native'';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Count: {count}</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: ''center'',
    alignItems: ''center'',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: ''#007AFF'',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: ''white'',
    fontSize: 16,
  },
});
```

### Flutter Widget
```dart
import ''package:flutter/material.dart'';

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              ''Count: $_count'',
              style: TextStyle(fontSize: 24),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _count++;
                });
              },
              child: Text(''Increment''),
              style: ElevatedButton.styleFrom(
                primary: Colors.blue,
                padding: EdgeInsets.symmetric(
                  horizontal: 30,
                  vertical: 15,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Market Adoption

### React Native
- **Used by**: Facebook, Instagram, Airbnb, Tesla
- **Market Share**: Larger developer community
- **Job Market**: More job opportunities

### Flutter
- **Used by**: Google Pay, Alibaba, BMW, Toyota
- **Growth**: Rapidly growing adoption
- **Future**: Strong backing from Google

## Decision Matrix

| Factor | React Native | Flutter |
|--------|-------------|---------|
| Learning Curve | Easy (if you know React) | Moderate |
| Performance | Good | Excellent |
| UI Consistency | Platform-specific | Consistent |
| Community | Large | Growing |
| Development Speed | Fast | Very Fast |
| Code Sharing | Good | Excellent |

## Conclusion

**Choose React Native if:**
- You have React/JavaScript experience
- Need to integrate with existing React web apps
- Want platform-specific UI/UX
- Need access to mature third-party libraries

**Choose Flutter if:**
- You want maximum performance
- Need consistent UI across platforms
- Building a new app from scratch
- Want to future-proof your investment

Both frameworks are excellent choices. Your decision should be based on your team''s expertise, project requirements, and long-term goals.

Remember: The best framework is the one your team can use effectively to deliver great user experiences! 🚀📱',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
  ARRAY['React Native', 'Flutter', 'Mobile Development', 'Cross-Platform'],
  (SELECT id FROM authors WHERE email = 'david.kim@example.com'),
  1050,
  85,
  9,
  false,
  true
);

-- Add some sample comments
INSERT INTO comments (blog_id, author_name, content) VALUES
(
  (SELECT id FROM blogs WHERE title LIKE 'React Best Practices%'),
  'John Developer',
  'Great article! The custom hooks section was particularly helpful. I''ve been struggling with logic reuse in my React apps.'
),
(
  (SELECT id FROM blogs WHERE title LIKE 'React Best Practices%'),
  'Sarah Code',
  'Thanks for the composition over inheritance tip. This will definitely improve my component architecture.'
),
(
  (SELECT id FROM blogs WHERE title LIKE 'The Art of Minimalist%'),
  'Design Enthusiast',
  'Love the minimalist approach! Clean design really does improve user experience. The CSS examples are very practical.'
),
(
  (SELECT id FROM blogs WHERE title LIKE 'Docker Containerization%'),
  'DevOps Pro',
  'Excellent Docker guide! The multi-stage build example saved me a lot of space in my images. Thanks!'
),
(
  (SELECT id FROM blogs WHERE title LIKE 'Introduction to Machine Learning%'),
  'ML Beginner',
  'Perfect introduction to ML! The step-by-step approach made it easy to follow. Looking forward to more advanced topics.'
);
