import db from "./db"
import { 
    BookingsTable, CarTable, CustomerTable, InsuranceTable, LocationTable, MaintenanceTable, PaymentTable, ReservationTable 
} from "./schema"

//CRUD
async function seed() {
    console.log("Seeding to the database started...")
    //insert into location table
    await db.insert(LocationTable).values([
        { locationName: "Nairobi", address: "123 Nairobi", contactNumber: "1234567890" },
        { locationName: "Eldoret", address: "Eldoret", contactNumber: "0987654321" },
        { locationName: "Nakuru", address: "789 Nakuru", contactNumber: "5555555555" },
        { locationName: "Nyeri", address: "321 Nyeri", contactNumber: "2223334444" },
        { locationName: "Mombasa", address: "111 Mombasa", contactNumber: "6667778888" }, 
    ])

    // insert customers
    // For demonstration, use a plain string as the password. In production, use a proper hash function.
    const hashedPassword = "password123"; // Replace with a real hash in production

   await db.insert(CustomerTable).values([
  {
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    phoneNumber: "1234567890",
    address: "123 Main St",
    password: hashedPassword,
   
  },
  {
    firstName: "Bob",
    lastName: "Jones",
    email: "bob@example.com",
    phoneNumber: "0987654321",
    address: "456 Side St",
    password: hashedPassword,
   
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie@example.com",
    phoneNumber: "5551234567",
    address: "789 Elm St",
    password: hashedPassword,
   
  },
  {
    firstName: "Diana",
    lastName: "Prince",
    email: "diana@example.com",
    phoneNumber: "4449876543",
    address: "321 Oak St",
    password: hashedPassword,
    
  },
  {
    firstName: "Ethan",
    lastName: "Hunt",
    email: "ethan@example.com",
    phoneNumber: "6665554433",
    address: "159 Pine St",
    password: hashedPassword,
   
  },
]);


    //insert cars
    await db.insert(CarTable).values([
         { carModel: "Toyota Corolla", year: "2020-01-01", color: "Red", rentalRate: "50.00", availability: true, locationID: 1 },
        { carModel: "Honda Civic", year: "2019-06-01", color: "Blue", rentalRate: "55.00", availability: true, locationID: 2 },
        { carModel: "Ford Focus", year: "2021-03-01", color: "Black", rentalRate: "60.00", availability: true, locationID: 3 },
        { carModel: "Chevrolet Malibu", year: "2022-07-01", color: "White", rentalRate: "65.00", availability: true, locationID: 4 },
        { carModel: "Nissan Altima", year: "2018-09-01", color: "Silver", rentalRate: "52.00", availability: true, locationID: 5 },
    ])

    
    // insert reservations
    await db.insert(ReservationTable).values([
        { customerID: 1, carID: 1, reservationDate: "2024-06-01", pickupDate: "2024-06-05", returnDate: "2024-06-10" },
        { customerID: 2, carID: 2, reservationDate: "2024-06-02", pickupDate: "2024-06-06", returnDate: "2024-06-11" },
        { customerID: 3, carID: 3, reservationDate: "2024-06-03", pickupDate: "2024-06-07", returnDate: "2024-06-12" },
        { customerID: 4, carID: 4, reservationDate: "2024-06-04", pickupDate: "2024-06-08", returnDate: "2024-06-13" },
        { customerID: 5, carID: 5, reservationDate: "2024-06-05", pickupDate: "2024-06-09", returnDate: "2024-06-14" },
    ]);

        // insert bookings
    await db.insert(BookingsTable).values([
        { carID: 1, customerID: 1, rentalStartDate: "2024-06-05", rentalEndDate: "2024-06-10", totalAmount: "250.00" },
        { carID: 2, customerID: 2, rentalStartDate: "2024-06-06", rentalEndDate: "2024-06-11", totalAmount: "275.00" },
        { carID: 3, customerID: 3, rentalStartDate: "2024-06-07", rentalEndDate: "2024-06-12", totalAmount: "300.00" },
        { carID: 4, customerID: 4, rentalStartDate: "2024-06-08", rentalEndDate: "2024-06-13", totalAmount: "325.00" },
        { carID: 5, customerID: 5, rentalStartDate: "2024-06-09", rentalEndDate: "2024-06-14", totalAmount: "350.00" },
    ]);



    
    // insert payments
    await db.insert(PaymentTable).values([
        { bookingID: 1, paymentDate: "2024-06-05", amount: "250.00", paymentMethod: "Credit Card" },
        { bookingID: 2, paymentDate: "2024-06-06", amount: "275.00", paymentMethod: "Debit Card" },
        { bookingID: 3, paymentDate: "2024-06-07", amount: "300.00", paymentMethod: "Cash" },
        { bookingID: 4, paymentDate: "2024-06-08", amount: "325.00", paymentMethod: "Credit Card" },
        { bookingID: 5, paymentDate: "2024-06-09", amount: "350.00", paymentMethod: "Debit Card" },
    ]);

    // insert maintenance
    await db.insert(MaintenanceTable).values([
        { carID: 1, maintenanceDate: "2024-06-01", description: "Oil change and tire rotation" },
        { carID: 2, maintenanceDate: "2024-06-02", description: "Brake inspection and fluid top-up" },
        { carID: 3, maintenanceDate: "2024-06-03", description: "Engine check and battery replacement" },
        { carID: 4, maintenanceDate: "2024-06-04", description: "Transmission service and filter change" },
        { carID: 5, maintenanceDate: "2024-06-05", description: "Alignment and suspension check" },
    ]);


    // Insert Insurance
    await db.insert(InsuranceTable).values([
        { carID: 1, insuranceProvider: "ABC Insurance", policyNumber: "12345", startDate: "2024-01-01", endDate: "2024-12-31" },
        { carID: 2, insuranceProvider: "XYZ Insurance", policyNumber: "54321", startDate: "2024-02-01", endDate: "2025-01-31" },
        { carID: 3, insuranceProvider: "Delta Insurance", policyNumber: "67890", startDate: "2024-03-01", endDate: "2025-02-28" },
        { carID: 4, insuranceProvider: "SafeDrive", policyNumber: "98765", startDate: "2024-04-01", endDate: "2025-03-31" },
        { carID: 5, insuranceProvider: "ShieldCover", policyNumber: "11111", startDate: "2024-05-01", endDate: "2025-04-30" },
    ]);
    

    console.log('Seeding the database completed successfully')
    process.exit(0);
}


seed().catch((error) => {
    console.log("Error seeding data")
    process.exit(0)
})