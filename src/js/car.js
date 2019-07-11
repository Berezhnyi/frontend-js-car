const car = {
	color: 'white',
	dours: 4,
	speed: 0,
	defaultSpeed: 60,
	maxSpeed: 100,
	seats: 4,
	passengers: [],

	put () {
		if (this.passengers.length < this.seats) {
			this.passengers.push(true);
		}
	},
	land () {
		if (this.passengers.length) {
			this.passengers.pop();
			if (!this.passengers.length) {
				this.speed = 0;
			}
		}

	},
	drive (newSpeed) {
		if (this.passengers.length) {
			if (newSpeed <= this.maxSpeed) {	
				this.speed = newSpeed;
			} else if (newSpeed > this.maxSpeed) {
				this.speed = this.maxSpeed;
			}
			else {
				this.speed = this.defaultSpeed;
			}
		}
	}
};

export default car;