"""empty message

Revision ID: 7925b8e4e736
Revises: 9fdd2206b5d6
Create Date: 2023-11-15 13:42:52.244732

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7925b8e4e736'
down_revision = '9fdd2206b5d6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('code_submission',
    sa.Column('submission_id', sa.String(length=100), nullable=False),
    sa.Column('submission_date', sa.Time(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('code', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('submission_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('code_submission')
    # ### end Alembic commands ###
