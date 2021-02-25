from app.models import db, Review, User, Aircraft

def seed_review():
  user = User.query.filter_by(username = "Demo").first()
  service = Aircraft.query.filter_by(business_name="Helicopters R' Us!").first()
  service2 = Aircraft.query.filter_by(business_name="Sky High Diving").first()
  review1 = Review(
    rate=4,
    title="This place was amazing!",
    comment="Like... this was totally the most AMAZING experience of all time, the instructor was FANTASTIC",
    user=user,
    service=service
  )
  review2 = Review(
    rate=1,
    title="NO",
    comment="Im pretty sure I almost died?",
    user=user,
    service=service2
  )

  db.session.add(review1)
  db.session.add(review2)
  db.session.commit()

def undo_review():
    db.session.execute('TRUNCATE aircrafts CASCADE;')
    db.session.commit()
