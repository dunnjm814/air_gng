"""switching user column to profile

Revision ID: a6c80000bd41
Revises: f49e28c60771
Create Date: 2021-02-25 14:01:20.713990

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a6c80000bd41'
down_revision = 'f49e28c60771'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('wish_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['service_id'], ['aircrafts.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('profiles', sa.Column('first_name', sa.String(length=40), nullable=True))
    op.add_column('profiles', sa.Column('last_name', sa.String(length=40), nullable=True))
    op.add_column('profiles', sa.Column('phone_number', sa.String(length=12), nullable=True))
    op.drop_constraint('users_phone_number_key', 'users', type_='unique')
    op.drop_column('users', 'first_name')
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'phone_number')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('phone_number', sa.VARCHAR(length=12), autoincrement=False, nullable=False))
    op.add_column('users', sa.Column('last_name', sa.VARCHAR(length=40), autoincrement=False, nullable=False))
    op.add_column('users', sa.Column('first_name', sa.VARCHAR(length=40), autoincrement=False, nullable=False))
    op.create_unique_constraint('users_phone_number_key', 'users', ['phone_number'])
    op.drop_column('profiles', 'phone_number')
    op.drop_column('profiles', 'last_name')
    op.drop_column('profiles', 'first_name')
    op.drop_table('wish_list')
    # ### end Alembic commands ###
