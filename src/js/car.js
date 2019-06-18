export function car () {
	this.color = 'white',
	this.dours = 4,
	this.speed = 0,
	this.defaultspeed = 60,
	this.maxSpeed = 100,
	this.seats = 4,
	this.passenger = [],
	function put () {
		if (this.passenger.length < this.seats + 1) {
			this.passenger.push(true);
		}
	};
	function land () {
		if (this.passenger.length > 0) {
			this.passenger.pop();
		}
		if (this.passenger.length === 0) {
			this.speed = 0;
		}
	}
	function drive (speed) {
		if (this.maxSpeed < speed) {
			this.speed = speed;
		}
	}
}