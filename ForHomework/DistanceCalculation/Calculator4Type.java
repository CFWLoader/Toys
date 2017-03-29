/**
 * Created by cfwlo on 2017/3/29.
 */

public class Calculator4Type {

    public static void main(String args[])
    {
        System.out.print(euclidDistance(1.4, 1.6, 1.5, 1.7));
        System.out.print('-');
        System.out.print(manhattanDistance(1.4, 1.6, 1.5, 1.7));
        System.out.print('-');
        System.out.print(chebyshevDistance(1.4, 1.6, 1.5, 1.7));
        System.out.print('-');
        System.out.print(cosineSimilarity(1.4, 1.6, 1.5, 1.7));
        System.out.println();

        System.out.print(euclidDistance(1.4, 1.6, 2, 1.9));
        System.out.print('-');
        System.out.print(manhattanDistance(1.4, 1.6, 2, 1.9));
        System.out.print('-');
        System.out.print(chebyshevDistance(1.4, 1.6, 2, 1.9));
        System.out.print('-');
        System.out.print(cosineSimilarity(1.4, 1.6, 2, 1.9));
        System.out.println();

        System.out.print(euclidDistance(1.4, 1.6, 1.6, 1.8));
        System.out.print('-');
        System.out.print(manhattanDistance(1.4, 1.6, 1.6, 1.8));
        System.out.print('-');
        System.out.print(chebyshevDistance(1.4, 1.6, 1.6, 1.8));
        System.out.print('-');
        System.out.print(cosineSimilarity(1.4, 1.6, 1.6, 1.8));
        System.out.println();

        System.out.print(euclidDistance(1.4, 1.6, 1.2, 1.5));
        System.out.print('-');
        System.out.print(manhattanDistance(1.4, 1.6, 1.2, 1.5));
        System.out.print('-');
        System.out.print(chebyshevDistance(1.4, 1.6, 1.2, 1.5));
        System.out.print('-');
        System.out.print(cosineSimilarity(1.4, 1.6, 1.2, 1.5));
        System.out.println();

        System.out.print(euclidDistance(1.4, 1.6, 1.5, 1));
        System.out.print('-');
        System.out.print(manhattanDistance(1.4, 1.6, 1.5, 1));
        System.out.print('-');
        System.out.print(chebyshevDistance(1.4, 1.6, 1.5, 1));
        System.out.print('-');
        System.out.print(cosineSimilarity(1.4, 1.6, 1.5, 1));
        System.out.println();
    }

    private static double euclidDistance(double x1, double y1, double x2, double y2)
    {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    private static double manhattanDistance(double x1, double y1, double x2, double y2)
    {
        return  Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    private static double chebyshevDistance(double x1, double y1, double x2, double y2)
    {
        double a = Math.abs(x1 - x2), b = Math.abs(y1 - y2);

        return Math.max(a, b);
    }

    private static double cosineSimilarity(double x1, double y1, double x2, double y2)
    {
        return (x1 * x2 + y1 * y2)/(Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2));
    }
}
