"""aircraft model

Revision ID: 7eb4bc19b6ac
Revises: 69c3547b4718
Create Date: 2021-02-24 15:02:51.432809

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7eb4bc19b6ac'
down_revision = '69c3547b4718'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('aircrafts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('business_name', sa.String(length=100), nullable=False),
    sa.Column('biz_image', sa.String(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('aircraft', sa.String(length=25), nullable=False),
    sa.Column('address', sa.String(length=75), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=2), nullable=False),
    sa.Column('zip_code', sa.Integer(), nullable=False),
    sa.Column('phone_number', sa.String(length=12), nullable=False),
    sa.Column('lng', sa.Float(), nullable=False),
    sa.Column('lat', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('phone_number')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('aircrafts')
    # ### end Alembic commands ###
