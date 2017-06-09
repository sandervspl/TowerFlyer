import MobileDetect from 'mobile-detect';

class Device {
  private static md = new MobileDetect(window.navigator.userAgent);

  public static isMobile = () => {
    const { md } = Device;

    return md.phone() !== null || md.isPhoneSized();
  }
}

export default Device;
