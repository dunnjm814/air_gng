"""empty message

Revision ID: c3c7fa116dce
Revises: a6c80000bd41
Create Date: 2021-02-26 16:42:56.572118

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c3c7fa116dce'
down_revision = 'a6c80000bd41'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('bookings', 'book_end_time',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('bookings', 'book_start_time',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('bookings', 'book_start_time',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('bookings', 'book_end_time',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    # ### end Alembic commands ###
