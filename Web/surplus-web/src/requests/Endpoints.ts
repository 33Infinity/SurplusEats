const isLocal = true;
export default class Endpoints {
  static Authentication = class {
    public static getProfile = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/auth-getProfile"
      : "https://us-central1-surplus-functions.cloudfunctions.net/auth-getProfile";
    public static register = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/auth-register"
      : "https://us-central1-surplus-functions.cloudfunctions.net/auth-register";
    public static signIn = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/auth-signIn"
      : "https://us-central1-surplus-functions.cloudfunctions.net/auth-signIn";
  };

  static Cart = class {
    public static add = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/cart-add"
      : "https://us-central1-surplus-functions.cloudfunctions.net/cart-add";
    public static getByEmail = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/cart-getByEmail"
      : "https://us-central1-surplus-functions.cloudfunctions.net/cart-getByEmail";
  };

  static Inventory = class {
    public static add = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/inventory-add"
      : "https://us-central1-surplus-functions.cloudfunctions.net/inventory-add";
    public static delete = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/inventory-delete"
      : "https://us-central1-surplus-functions.cloudfunctions.net/inventory-delete";
    public static getById = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/inventory-getById"
      : "https://us-central1-surplus-functions.cloudfunctions.net/inventory-getById";
    public static getByLocation = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/inventory-getByLocation"
      : "https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByLocation";
    public static getByVendorLocation = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/inventory-getByVendorLocation"
      : "https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByVendorLocation";
    public static update = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/inventory-update"
      : "https://us-central1-surplus-functions.cloudfunctions.net/inventory-update";
  };

  static Location = class {
    public static add = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/location-add"
      : "https://us-central1-surplus-functions.cloudfunctions.net/location-add";
    public static delete = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/location-delete"
      : "https://us-central1-surplus-functions.cloudfunctions.net/location-delete";
    public static getById = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/location-getById"
      : "https://us-central1-surplus-functions.cloudfunctions.net/location-getById";
    public static getByLatLon = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/location-getByLatLon"
      : "https://us-central1-surplus-functions.cloudfunctions.net/location-getByLatLon";
    public static getByVendor = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/location-getByVendor"
      : "https://us-central1-surplus-functions.cloudfunctions.net/location-getByVendor";
    public static update = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/location-update"
      : "https://us-central1-surplus-functions.cloudfunctions.net/location-update";
  };

  static Notification = class {
    public static add = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/notification-add"
      : "https://us-central1-surplus-functions.cloudfunctions.net/notification-add";
    public static delete = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/notification-delete"
      : "https://us-central1-surplus-functions.cloudfunctions.net/notification-delete";
    public static markAllAsRead = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/notification-markAllAsRead"
      : "https://us-central1-surplus-functions.cloudfunctions.net/notification-markAllAsRead";
    public static getByEmail = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/notification-getByEmail"
      : "https://us-central1-surplus-functions.cloudfunctions.net/notification-getByEmail";
    public static update = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/notification-update"
      : "https://us-central1-surplus-functions.cloudfunctions.net/notification-update";
  };

  static Subscription = class {
    public static add = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/subscription-add"
      : "https://us-central1-surplus-functions.cloudfunctions.net/subscription-add";
    public static delete = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/subscription-delete"
      : "https://us-central1-surplus-functions.cloudfunctions.net/subscription-delete";
  };

  static Vendor = class {
    public static getByEmail = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/vendor-getByEmail"
      : "https://us-central1-surplus-functions.cloudfunctions.net/vendor-getByEmail";
    public static update = isLocal
      ? "http://localhost:6002/surplus-functions/us-central1/vendor-update"
      : "https://us-central1-surplus-functions.cloudfunctions.net/vendor-update";
  };
}
