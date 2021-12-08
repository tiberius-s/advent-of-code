import { one } from "./one";
import { two } from "./two";
import { three } from "./three";
import { four } from "./four";
import { five } from "./five";
import { six } from "./six";
import { seven } from "./seven";

export { one, two, three, four, five, six, seven };

// TODO: Use Map<string, () => void>> and add some other validations in main cli script
const solutions: Record<string, () => void> = {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
};

export default solutions;
