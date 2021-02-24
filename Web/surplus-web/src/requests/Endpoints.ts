export default class Endpoints {
  static Authentication = class {
    public static getProfile =
      "http://localhost:6002/surplus-functions/us-central1/auth-getProfile";
    public static register =
      "http://localhost:6002/surplus-functions/us-central1/auth-register";
    public static signIn =
      "http://localhost:6002/surplus-functions/us-central1/auth-signIn";
  };

  static Cart = class {
    public static add =
      "http://localhost:6002/surplus-functions/us-central1/cart-add";
    public static getByEmail =
      "http://localhost:6002/surplus-functions/us-central1/cart-getByEmail";
  };

  static Inventory = class {
    public static add =
      "http://localhost:6002/surplus-functions/us-central1/inventory-add";
    public static delete =
      "http://localhost:6002/surplus-functions/us-central1/inventory-delete";
    public static getById =
      "http://localhost:6002/surplus-functions/us-central1/inventory-getById";
    public static getByLocation =
      "http://localhost:6002/surplus-functions/us-central1/inventory-getByLocation";
    //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByLocation";
    public static getByVendorLocation =
      "http://localhost:6002/surplus-functions/us-central1/inventory-getByVendorLocation";
    //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByVendor";
    public static update =
      "http://localhost:6002/surplus-functions/us-central1/inventory-update";
  };

  static Location = class {
    public static add =
      "http://localhost:6002/surplus-functions/us-central1/location-add";
    public static delete =
      "http://localhost:6002/surplus-functions/us-central1/location-delete";
    public static getById =
      "http://localhost:6002/surplus-functions/us-central1/location-getById";
    public static getByLatLon =
      "http://localhost:6002/surplus-functions/us-central1/location-getByLatLon";
    public static getByVendor =
      "http://localhost:6002/surplus-functions/us-central1/location-getByVendor";
    public static update =
      "http://localhost:6002/surplus-functions/us-central1/location-update";
  };

  static Notification = class {
    public static add =
      "http://localhost:6002/surplus-functions/us-central1/notification-add";
    public static delete =
      "http://localhost:6002/surplus-functions/us-central1/notification-delete";
    public static markAllAsRead =
      "http://localhost:6002/surplus-functions/us-central1/notification-markAllAsRead";
    public static getByEmail =
      "http://localhost:6002/surplus-functions/us-central1/notification-getByEmail";
    public static update =
      "http://localhost:6002/surplus-functions/us-central1/notification-update";
  };

  static Subscription = class {
    public static add =
      "http://localhost:6002/surplus-functions/us-central1/subscription-add";
    public static delete =
      "http://localhost:6002/surplus-functions/us-central1/subscription-delete";
  };

  static Vendor = class {
    public static getByEmail =
      "http://localhost:6002/surplus-functions/us-central1/vendor-getByEmail";
    public static update =
      "http://localhost:6002/surplus-functions/us-central1/vendor-update";
  };
}
