// dependencies
import IObserver from './IObserver';

interface ISubject {
  register(observer: IObserver): void;
  unregister(observer: IObserver): void;
  notifyObservers(b: boolean): void;
}

export default ISubject;
