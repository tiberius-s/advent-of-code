import { one } from "./one";
import { two } from "./two";
import { three } from "./three";
import { four } from "./four";
import { five } from "./five";
import { six } from "./six";

export { one, two, three, four, five, six };

// TODO: Use Map<string, () => void>> and add some other checks in main
const solutions: Record<string, () => void> = {
  one,
  two,
  three,
  four,
  five,
  six,
};

export default solutions;
