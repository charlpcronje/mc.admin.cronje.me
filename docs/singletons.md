# Singleton Design Pattern

/**
 * TODO [ ] : Add the Notion client as a singleton
 */ 

The Singleton pattern is a creation's design pattern that ensures a class has only one instance and provides a global access point to that instance [Refactoring Guru](https://refactoring.guru/design-patterns/singleton). It is useful when exactly one object is needed to coordinate actions across a system, such as logging, drivers objects, caching, and thread pool (https://www.digitalocean.com/community/tutorials/java-singleton-design-pattern-best-practices-examples).

There are several ways to implement the Singleton pattern, each with its pros and cons:

1. **Classic Implementation** ([Geeks for Geeks](https://www.geeksforgeeks.org/singleton-design-pattern/)):

```js
public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

**Pros**:
- Simple implementation.

**Cons**:
- Not thread-safe, which can lead to multiple instances being created in a multithreaded environment.

2. **Thread-Safe Singleton** ([Digital Ocean](https://www.digitalocean.com/community/tutorials/java-singleton-design-pattern-best-practices-examples)):

```js
public class ThreadSafeSingleton {
    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton() {}

    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }
}
```

**Pros**:
- Thread-safe implementation.

**Cons**:
- Reduced performance due to the cost associated with the synchronized method.

3. **Double-Checked Locking Singleton** ([Digital Ocean](https://www.digitalocean.com/community/tutorials/java-singleton-design-pattern-best-practices-examples)):

```java
public class ThreadSafeSingleton {
    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton() {}

    public static ThreadSafeSingleton getInstanceUsingDoubleLocking() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}
```

**Pros**:
- Thread-safe implementation with better performance than the synchronized method.

**Cons**:
- Slightly more complex implementation.

It is important to note that the Singleton pattern has its critics. Some argue that it violates the Single Responsibility Principle by solving two problems at once (ensuring a single instance and providing a global access point) [Refactoring Guru](https://refactoring.guru/design-patterns/singleton). Additionally, the Singleton pattern can mask bad design, such as components knowing too much about each other, and may require special treatment in a multithreaded environment [Refactoring Guru](https://refactoring.guru/design-patterns/singleton). 