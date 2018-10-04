from flask import Flask, render_template, request, redirect, url_for
from models import db, Users
from forms import UsersForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:Winchester110283@localhost/homework_users'

db.init_app(app)

app.secret_key = "e14a-key"

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html') 

@app.route('/add-user', methods=['GET', 'POST'])
def add_user():
	form = UsersForm()
	if request.method == 'GET':
		return render_template('add_user.html', form=form)
	else:
		if form.validate_on_submit():
			username = request.form['username']
			first_name = request.form['first_name']
			last_name = request.form['last_name']
			prog_lang = request.form.get('prog_lang')
			experience_yr = request.form['experience_yr']
			age = request.form['age']
			hw1_hrs = request.form['hw1_hrs']
			new_user = Users(username=username, first_name=first_name, last_name=last_name, prog_lang=prog_lang, experience_yr=experience_yr, age=age, hw1_hrs=hw1_hrs)
			db.session.add(new_user)
			db.session.commit()
			return redirect(url_for('index'))
		#return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)
