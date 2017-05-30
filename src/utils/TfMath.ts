class TfMath {
  public static getAverageOfArray(array: number[]): number {
    if (array.length === 0) { return 0; }

    const sum = array.reduce((previous, current) => current += previous);

    return sum / array.length;
  }

  public static getMedianOfArray(array: number[]): number {
    if (array.length === 0) { return 0; }

    const sortedArray = array.sort((a, b) => a - b);

    return (sortedArray[(sortedArray.length - 1) >> 1] + sortedArray[sortedArray.length >> 1]) / 2;
  }

  public static randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default TfMath;
