import db from '../../src/Drizzle/db';
import {
  getCustomerReservations,
  getBookingsWithPayments,
  getCarsWithLocation,
  getCustomerBookingWithCarDetails
} from '../../src/joins/joins.service';

jest.mock('../../src/Drizzle/db', () => ({
  select: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis()
  }))
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Joins Service', () => {
  describe('getCustomerReservations', () => {
    it('should return reservations with customer and car details', async () => {
      const mockData = [
        {
          reservation: { reservationID: 1 },
          customer: { customerID: 1, name: 'John' },
          car: { carID: 1, model: 'Toyota' }
        }
      ];

      (db.select as jest.Mock).mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          leftJoin: jest.fn().mockReturnValueOnce({
            leftJoin: jest.fn().mockResolvedValueOnce(mockData)
          })
        })
      });

      const result = await getCustomerReservations();
      expect(result).toEqual(mockData);
    });
  });

  describe('getBookingsWithPayments', () => {
    it('should return bookings with optional payment info', async () => {
      const mockData = [
        {
          booking: { bookingID: 1 },
          payment: { paymentID: 1, amount: 100 }
        }
      ];

      (db.select as jest.Mock).mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          leftJoin: jest.fn().mockResolvedValueOnce(mockData)
        })
      });

      const result = await getBookingsWithPayments();
      expect(result).toEqual(mockData);
    });

    it('should throw an error on failure', async () => {
      (db.select as jest.Mock).mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          leftJoin: jest.fn().mockRejectedValueOnce(new Error('DB error'))
        })
      });

      await expect(getBookingsWithPayments()).rejects.toThrow('DB error');
    });
  });

  describe('getCarsWithLocation', () => {
    it('should return cars with location info', async () => {
      const mockData = [
        {
          car: { carID: 1, model: 'Nissan' },
          location: { locationID: 1, city: 'Nairobi' }
        }
      ];

      (db.select as jest.Mock).mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          leftJoin: jest.fn().mockResolvedValueOnce(mockData)
        })
      });

      const result = await getCarsWithLocation();
      expect(result).toEqual(mockData);
    });
  });

  describe('getCustomerBookingWithCarDetails', () => {
    it('should return customer bookings with car details', async () => {
      const mockData = [
        {
          booking: { bookingID: 1 },
          customer: { customerID: 1, name: 'Alice' },
          car: { carID: 1, model: 'Ford' }
        }
      ];

      (db.select as jest.Mock).mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          innerJoin: jest.fn().mockReturnValueOnce({
            innerJoin: jest.fn().mockResolvedValueOnce(mockData)
          })
        })
      });

      const result = await getCustomerBookingWithCarDetails();
      expect(result).toEqual(mockData);
    });

    it('should throw an error on failure', async () => {
      (db.select as jest.Mock).mockReturnValueOnce({
        from: jest.fn().mockReturnValueOnce({
          innerJoin: jest.fn().mockReturnValueOnce({
            innerJoin: jest.fn().mockRejectedValueOnce(new Error('Join error'))
          })
        })
      });

      await expect(getCustomerBookingWithCarDetails()).rejects.toThrow('Join error');
    });
  });
});
