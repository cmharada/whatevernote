class User < ActiveRecord::Base
  validates :username, uniqueness: true
  validates :username, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  after_initialize :ensure_session_token
  
  attr_reader :password
  
  has_many :notebooks
  
  def self.generate_session_token!
    SecureRandom.urlsafe_base64(16);
  end
  
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return user if user && user.is_password?(password)
    return nil
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def reset_session_token!
    self.session_token = self.class.generate_session_token!
    self.save!
    self.session_token
  end
  
  private
  
  def ensure_session_token
    self.session_token = self.class.generate_session_token!
  end
end
