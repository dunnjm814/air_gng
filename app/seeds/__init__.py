from flask.cli import AppGroup
from .users import seed_users, undo_users
from .profile import seed_profile, undo_profile
from .aircraft import seed_biz, undo_biz
from .reviews import seed_review, undo_review

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_profile()
    seed_biz()
    seed_review()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_profile()
    undo_biz()
    undo_review()
    # Add other undo functions here
