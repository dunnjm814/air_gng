from app.models import db, Profile

def seed_profile():

  demo = Profile(about="hey its an about me im a demo!", location="I am from Detroit", work="freelance demo-user", language="00110011", user_id=1)

  db.session.add(demo)
  db.session.commit()


def undo_profiles():
    db.session.execute('TRUNCATE profiles;')
    db.session.commit()
