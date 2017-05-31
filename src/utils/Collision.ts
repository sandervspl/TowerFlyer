// dependencies
import GameObject from '../game/GameObject';
import IObstacleShape from '../game/interfaces/IObstacleShape';

// namespaces
import { env } from '../namespaces/environment';

class Collision {
  public static hitTestSpriteWithGraphic(go: GameObject, os: IObstacleShape) {
    if (env.isInvulnerable()) {
      return false;
    }

    const goSize = {
      width: go.getHitboxShape() ? go.getHitboxShape().width : go.getSprite().width,
      height: go.getHitboxShape() ? go.getHitboxShape().height : go.getSprite().height,
    };

    const goPoints = {
      x1: go.getLocation().x - goSize.width / 2,    // left
      x2: go.getLocation().x + goSize.width / 2,    // right
      y1: go.getLocation().y - goSize.height / 2,   // top
      y2: go.getLocation().y + goSize.height / 2,   // bottom
    };

    const osSize = {
      width: os.getHitboxShape() ? os.getHitboxShape().width : os.size.width,
      height: os.getHitboxShape() ? os.getHitboxShape().height : os.size.height,
    };

    const osPoints = {
      x1: os.getHitboxShape()
        ? os.getLocation().x + (os.size.width / 2 - osSize.width / 2)
        : os.getLocation().x,
      x2: os.getHitboxShape()
        ? os.getLocation().x + (os.size.width / 2 - osSize.width / 2) + osSize.width
        : os.getLocation().x + osSize.width,
      y1: os.getHitboxShape()
        ? os.getLocation().y + (os.size.height / 2 - osSize.height / 2)
        : os.getLocation().y,
      y2: os.getHitboxShape()
        ? os.getLocation().y + (os.size.height / 2 - osSize.height / 2) + osSize.height
        : os.getLocation().y + osSize.height,
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
