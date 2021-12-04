import { one } from "./one";
import { two } from "./two";
import { three } from "./three";
export { one, two, three };

const solutions: Record<string, () => void> = {
  one,
  two,
  three,
};

export default solutions;
