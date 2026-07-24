/**
 * CLIENT MODEL: UserModel
 * Encapsulates client-side user domain schema, data normalization (DTO), and validations.
 */

export class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.username = data.username || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.website = data.website || '';
    this.company = data.company || '';
    this.department = data.department || 'Engineering';
    this.role = data.role || 'Software Engineer';
    this.status = data.status || 'Active';
    this.city = data.city || 'San Francisco';
    this.avatar = data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name || 'User')}`;
  }

  /**
   * Factory method to map raw REST API JSON response to UserModel instance
   */
  static fromREST(json) {
    return new UserModel({
      id: json.id,
      name: json.name,
      username: json.username,
      email: json.email,
      phone: json.phone,
      website: json.website,
      company: json.company,
      department: json.department,
      role: json.role,
      status: json.status,
      city: json.city,
      avatar: json.avatar
    });
  }

  /**
   * Serializes UserModel into clean REST API payload
   */
  toREST() {
    return {
      name: this.name,
      username: this.username,
      email: this.email,
      phone: this.phone,
      website: this.website,
      company: this.company,
      department: this.department,
      role: this.role,
      status: this.status,
      city: this.city
    };
  }

  /**
   * Validates user entity fields before sending to REST API
   */
  static validate(data) {
    const errors = {};
    if (!data.name || !data.name.trim()) {
      errors.name = 'Full name is required';
    }
    if (!data.email || !data.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address format';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default UserModel;
