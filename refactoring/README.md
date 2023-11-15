
# 가상환경 생성
python3 -m venv myenv
source myenv/bin/activate

# Requirement
pip install flask
pip install openai
openai migrate
pip install python-dotenv

# TEST
python3 app.py

curl -X POST http://localhost:5000/refactoring \
-H "Content-Type: application/json" \
-d "{\"java_code\": \"public class Main {\\n    public static void main(String[] args) {\\n        int[] numbers = {5, 3, 2, 8, 1, 4};\\n\\n        System.out.println(\\\"Original array:\\\");\\n        printArray(numbers);\\n\\n        bubbleSort(numbers);\\n\\n        System.out.println(\\\"Sorted array:\\\");\\n        printArray(numbers);\\n    }\\n\\n    private static void bubbleSort(int[] array) {\\n        int n = array.length;\\n        int temp;\\n        for (int i = 0; i < n - 1; i++) {\\n            for (int j = 0; j < n - i - 1; j++) {\\n                if (array[j] > array[j + 1]) {\\n                    temp = array[j];\\n                    array[j] = array[j + 1];\\n                    array[j + 1] = temp;\\n                }\\n            }\\n        }\\n    }\\n\\n    private static void printArray(int[] array) {\\n        for (int i : array) {\\n            System.out.print(i + \\\" \\\" );\\n        }\\n        System.out.println();\\n    }\\n}\"}"

