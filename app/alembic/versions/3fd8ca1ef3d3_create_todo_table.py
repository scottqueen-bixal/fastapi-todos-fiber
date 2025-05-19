"""create todo table

Revision ID: 3fd8ca1ef3d3
Revises:
Create Date: 2025-05-19 10:28:04.554018

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3fd8ca1ef3d3'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'todos',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('task', sa.String(255), nullable=False),
        sa.Column('is_complete', sa.Boolean, nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=False),
    )


def downgrade():
    op.drop_table('todos')
