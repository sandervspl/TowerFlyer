// dependencies
import GameObject from '../game/GameObject';
import IObstacleShape from '../game/interfaces/IObstacleShape';

class Collision {
  public static hitTestSpriteWithGraphic(go: GameObject, os: IObstacleShape) {
    const goPoints = {
      x1: go.getLocation().x - go.getSprite().width / 2,    // left
      x2: go.getLocation().x + go.getSprite().width / 2,    // right
      y1: go.getLocation().y - go.getSprite().height / 2,   // top
      y2: go.getLocation().y + go.getSprite().height / 2,   // bottom
    };

    const osPoints = {
      x1: os.getLocation().x,                     // left
      x2: os.getLocation().x + os.size.width,     // right
      y1: os.getLocation().y,                     // top
      y2: os.getLocation().y +  os.size.height,   // bottom
    };

    const isCollision = goPoints.x1 < osPoints.x2 &&
      goPoints.x2 > osPoints.x1 &&
      goPoints.y1 < osPoints.y2 &&
      goPoints.y2 > osPoints.y1;

    // if (isCollision) {
    //   console.log(goPoints);
    //   console.log(osPoints);
    // }

    return isCollision;
  }
}

export default Collision;
