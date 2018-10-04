# Define Web Form
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, FloatField
from wtforms.validators import DataRequired

class UsersForm(FlaskForm):
	username = StringField('Username', validators=[DataRequired()])
	first_name = StringField('First Name', validators=[DataRequired()])
	last_name = StringField('Last Name', validators=[DataRequired()])
	prog_lang_options = [('py', 'Python'), ('java', 'Java'), ('php', 'PHP'), ('cpp', 'CPP'), ('js', 'JavaScript'), ('c++', 'C++'), ('other', 'other')]
	prog_lang = SelectField('Programming Language', choices=prog_lang_options, coerce=str, validators=[DataRequired()])
	#prog_lang = SelectField('Programming Language', choices=[('py', 'py'), ('java', 'java'), ('php', 'php'), ('cpp', 'cpp'), ('js', 'js'), ('c', 'c'), ('other', 'other')])
	experience_yr = FloatField('Years of Programming Experience', validators=[DataRequired()])
	age = IntegerField('Age', validators=[DataRequired()])
	hw1_hrs = FloatField('Hours Spent on HW 1', validators=[DataRequired()])
	submit = SubmitField('Add')