from .db import db

class Review(db.Model):
  __tablename__ = "reviews"

  id = db.Column(db.Integer, primary_key=True)
  rate = db.Column(db.Integer, nullable=False)
  title = db.Column(db.String, nullable=False)
  comment = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  service_id = db.Column(db.Integer, db.ForeignKey("aircrafts.id"), nullable=False)

  user = db.relationship("User", back_populates="review")
  service = db.relationship("Aircraft", back_populates="review")

  def to_dict(self):
    return {
      'id': self.id,
      'rate': self.rate,
      'title': self.title,
      'comment': self.comment,
      'user_id': self.user_id,
      'service_id': self.service_id,
    }

  def to_service(self, comment, user):
    return {
      "comment": comment,
      "user": user
    }
