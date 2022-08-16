# eunm--枚举类型
所有使用enum关键字声明的类都是Enum类的子类。所以先来看看Enum类

```java
public abstract class Enum<E extends Enum<E>> implements Comparable<E>, Serializable {
    protected Enum(String name, int ordinal) {
        throw new RuntimeException("Stub!");
    }

    public final String name() {
        throw new RuntimeException("Stub!");
    }

    public final int ordinal() {
        throw new RuntimeException("Stub!");
    }
    ...
}
```
构造方法是protected类型的，所以外部不能随意构造对象。对象的构造是在子类自动完成的。enum的使用：

```java
//定义枚举类型
enum Day {
    MONDAY, TUESDAY, WEDNESDAY,
    THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

反编译class文件


```java
//反编译Day.class
final class Day extends Enum
{
    //编译器为我们添加的静态的values()方法
    public static Day[] values()
    {
        return (Day[])$VALUES.clone();
    }
    //编译器为我们添加的静态的valueOf()方法，注意间接调用了Enum也类的valueOf方法
    public static Day valueOf(String s)
    {
        return (Day)Enum.valueOf(com/zejian/enumdemo/Day, s);
    }
    //私有构造函数
    private Day(String s, int i)
    {
        super(s, i);
    }
     //前面定义的7种枚举实例
    public static final Day MONDAY;
    public static final Day TUESDAY;
    public static final Day WEDNESDAY;
    public static final Day THURSDAY;
    public static final Day FRIDAY;
    public static final Day SATURDAY;
    public static final Day SUNDAY;
    private static final Day $VALUES[];

    static 
    {    
        //实例化枚举实例
        MONDAY = new Day("MONDAY", 0);
        TUESDAY = new Day("TUESDAY", 1);
        WEDNESDAY = new Day("WEDNESDAY", 2);
        THURSDAY = new Day("THURSDAY", 3);
        FRIDAY = new Day("FRIDAY", 4);
        SATURDAY = new Day("SATURDAY", 5);
        SUNDAY = new Day("SUNDAY", 6);
        $VALUES = (new Day[] {
            MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
        });
    }
}
```

结果很明显了哈！但是我使用jdk8的时候生成的class并不是这样，不知道是不是虚拟机优化了，但是原理是没有问题的。


