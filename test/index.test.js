﻿import car from '../src/js/car';

describe('Module "car"', () => {
	beforeEach(() => {
		jest.spyOn(car, 'drive');
		jest.spyOn(car, 'put');
		jest.spyOn(car, 'land');
	});

	afterEach(() => jest.clearAllMocks());

	describe('has a correct interface with a property', () => {
		it('"color" that is a String', () => {
			expect(car.color).toEqual(expect.any(String));
		});
		it('"dours" that is a Number', () => {
			expect(car.dours).toEqual(expect.any(Number));
		});
		it('"passengers" that is a Array', () => {
			expect(car.passengers).toEqual(expect.any(Array));
		});
		it('"seats" that is a Number', () => {
			expect(car.seats).toEqual(expect.any(Number));
		});
		it('"maxSpeed" that is a Number', () => {
			expect(car.maxSpeed).toEqual(expect.any(Number));
		});
		it('"defaultSpeed" that is a Number', () => {
			expect(car.defaultSpeed).toEqual(expect.any(Number));
		});
		it('"speed" that is a Number', () => {
			expect(car.speed).toEqual(expect.any(Number));
		});
		it('"drive" that is a Function', () => {
			expect(car.drive).toEqual(expect.any(Function));
		});
		it('"put" that is a Function', () => {
			expect(car.put).toEqual(expect.any(Function));
		});
		it('"land" that is a Function', () => {
			expect(car.land).toEqual(expect.any(Function));
		});
	});

	describe('by default has a property', () => {
		it('"color" equal "white"', () => {
			expect(car.color).toEqual('white');
		});
		it('"dours" equal 4', () => {
			expect(car.dours).toEqual(4);
		});
		it('"passengers" that is empty', () => {
			expect(car.passengers).toEqual([]);
		});
		it('"seats" equal 4', () => {
			expect(car.seats).toEqual(4);
		});
		it('"maxSpeed" equal 100', () => {
			expect(car.maxSpeed).toEqual(100);
		});
		it('"defaultSpeed" equal 60', () => {
			expect(car.defaultSpeed).toEqual(60);
		});
		it('"speed" equal 0', () => {
			expect(car.speed).toEqual(0);
		});
	});

	describe('pessangers', () => {
		afterEach(() => {
			car.speed = 0;
			car.seats = 8;
			car.maxSpeed = 200;
			car.defaultSpeed = 150;
			car.passengers.length = 0;
		});

		it('can be put', () => {
			car.put();
			car.put();

			expect(car.passengers).toHaveLength(2);
		});
		it('can be landed', () => {
			car.put();
			car.put();
			car.land();

			expect(car.passengers).toHaveLength(1);
		});
		it('can\'t be put more than seats', () => {
			let times = car.seats * 2;

			while (times--) {
				car.put();
			}

			expect(car.passengers).toHaveLength(car.seats);
		});
		it('are not landed if one more passengers are put than possible', () => {
			let times = car.seats * 2;

			while (times--) {
				car.put();
			}

			expect(car.land).not.toHaveBeenCalled();
		});
	});

	describe('when driven', () => {
		afterEach(() => {
			car.speed = 0;
			car.seats = 8;
			car.maxSpeed = 200;
			car.defaultSpeed = 150;
			car.passengers.length = 0;
		});

		it('can\'t drive without a driver', () => {
			const speed = 20;

			car.drive(speed);

			expect(car.speed).toEqual(0);
		});
		it('can drive with a driver', () => {
			car.put();
			car.drive();

			expect(car.speed).toBeGreaterThan(0);
		});
		it('changes speed', () => {
			const speed = 85;

			car.put();
			car.drive(speed);

			expect(car.speed).toEqual(speed);
		});
		it('can be stopped', () => {
			const speed = 85;

			car.put();
			car.drive(speed);
			car.drive(0);

			expect(car.speed).toEqual(0);
		});
		it('doesn\'t change speed without a driver', () => {
			const speed = 85;

			car.drive(speed);

			expect(car.speed).toEqual(0);
		});
		it('doesn\'t drive without a driver and with to high speed set', () => {
			const speed = 185;

			car.drive(speed);

			expect(car.speed).toEqual(0);
		});
		it('doesn\'t change speed if additional passenger is put', () => {
			const speed = 85;

			car.put();
			car.drive(speed);
			car.put();

			expect(car.speed).toEqual(speed);
		});
		it('doesn\'t change speed if some passenger is landed', () => {
			const speed = 85;

			car.put();
			car.put();
			car.drive(speed);
			car.land();

			expect(car.speed).toEqual(speed);
		});
		it('has a default speed', () => {
			car.put();
			car.drive();

			expect(car.speed).toEqual(car.defaultSpeed);
		});
		it('is limited by thr max speed', () => {
			const speed = car.maxSpeed + 85;

			car.put();
			car.drive(speed);

			expect(car.speed).toEqual(car.maxSpeed);
		});
		it('stopped if all passengers are landed', () => {
			const speed = 20;

			car.put();
			car.drive(speed);
			car.land();

			expect(car.speed).toEqual(0);
		});
	});
});