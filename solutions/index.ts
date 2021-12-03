import { one } from "./one";
import { two } from "./two";
export { one, two };

const solutions: Record<string, () => void> = {
  one,
  two,
};

export default solutions;
