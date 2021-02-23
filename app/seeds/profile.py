from app.models import db, Profile, User

def seed_profile():
  user = User.query.filter_by(username = "Demo").first()
  demo = Profile(about="hey its an about me im a demo!", location="I am from Detroit", work="freelance demo-user", language="00110011", user=user)

  db.session.add(demo)
  db.session.commit()


def undo_profile():
    db.session.execute('TRUNCATE profiles CASCADE;')
    db.session.commit()
