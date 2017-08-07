// dependencies
import App from '../app';
import GameObject from '../game/GameObject';
import IObstacleShape from '../game/interfaces/IObstacleShape';

// namespaces
import { env } from '../namespaces/environment';

class Collision {
  public static getLeftBound(): number {
    return 0;
  }

  public static getRightBound(): number {
    return App.getAppSize().width;
  }

  public static isInBounds = (x: number, spriteWidth: number): boolean => {
    const leftBound = Math.ceil(Collision.getLeftBound() + (spriteWidth / 2));
    const rightBound = Math.ceil(Collision.getRightBound() - (spriteWidth / 2));

    return x > leftBound && x < rightBound;
  }

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

    return goPoints.x1 < osPoints.x2 &&
      goPoints.x2 > osPoints.x1 &&
      goPoints.y1 < osPoints.y2 &&
      goPoints.y2 > osPoints.y1;
  }

  public static hitTestBetweenGameObjects(go1: GameObject, go2: GameObject) {
    const go1Points = {
      x1: go1.getLocation().x,
      x2: go1.getLocation().x + go1.getHitboxShape().width,
      y1: go1.getLocation().y,
      y2: go1.getLocation().y + go1.getHitboxShape().height,
    };

    const go2Points = {
      x1: go2.getLocation().x,
      x2: go2.getLocation().x + go2.getHitboxShape().width,
      y1: go2.getLocation().y,
      y2: go2.getLocation().y + go2.getHitboxShape().height,
    };

    return go1Points.x1 < go2Points.x2 &&
    go1Points.x2 > go2Points.x1 &&
    go1Points.y1 < go2Points.y2 &&
    go1Points.y2 > go2Points.y1;
  }
}

export default Collision;
