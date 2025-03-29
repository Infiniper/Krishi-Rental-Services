-- 1️⃣ User & Authentication
CREATE TABLE UserRoles (
    RoleID SERIAL PRIMARY KEY,
    RoleName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE,
    RoleID INT REFERENCES UserRoles(RoleID) ON DELETE CASCADE,
    Rating DECIMAL(3,2) DEFAULT 5.0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserVerification (
    VerificationID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    OTP VARCHAR(10) NOT NULL,
    Expiry TIMESTAMP NOT NULL,
    VerifiedAt TIMESTAMP
);

-- 2️⃣ Vehicle & Driver Management
CREATE TABLE VehicleTypes (
    TypeID SERIAL PRIMARY KEY,
    TypeName VARCHAR(50) UNIQUE NOT NULL,
    Capacity INT NOT NULL,
    BaseFare DECIMAL(10,2) NOT NULL
);

CREATE TABLE Vehicles (
    VehicleID SERIAL PRIMARY KEY,
    OwnerID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    TypeID INT REFERENCES VehicleTypes(TypeID) ON DELETE CASCADE,
    Model VARCHAR(100) NOT NULL,
    RegistrationNumber VARCHAR(50) UNIQUE NOT NULL,
    Status VARCHAR(50) CHECK (Status IN ('Available', 'Booked', 'Inactive')) DEFAULT 'Available',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VehicleInsurance (
    InsuranceID SERIAL PRIMARY KEY,
    VehicleID INT REFERENCES Vehicles(VehicleID) ON DELETE CASCADE,
    Provider VARCHAR(100) NOT NULL,
    PolicyNumber VARCHAR(50) UNIQUE NOT NULL,
    ExpiryDate DATE NOT NULL
);

CREATE TABLE DriverProfiles (
    DriverID INT PRIMARY KEY REFERENCES Users(UserID) ON DELETE CASCADE,
    LicenseNumber VARCHAR(50) UNIQUE NOT NULL,
    Experience INT CHECK (Experience >= 0),
    BackgroundCheckStatus BOOLEAN DEFAULT FALSE
);

CREATE TABLE DriverRatings (
    RatingID SERIAL PRIMARY KEY,
    DriverID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    ClientID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    Stars INT CHECK (Stars BETWEEN 1 AND 5),
    Review TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3️⃣ Ride & Booking System
CREATE TABLE RideRequests (
    RequestID SERIAL PRIMARY KEY,
    ClientID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    StartLocation VARCHAR(255) NOT NULL,
    EndLocation VARCHAR(255) NOT NULL,
    PreferredVehicleType INT REFERENCES VehicleTypes(TypeID) ON DELETE SET NULL,
    Status VARCHAR(50) CHECK (Status IN ('Pending', 'Accepted', 'Cancelled')) DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Rides (
    RideID SERIAL PRIMARY KEY,
    ClientID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    DriverID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    VehicleID INT REFERENCES Vehicles(VehicleID) ON DELETE SET NULL,
    StartLocation VARCHAR(255) NOT NULL,
    EndLocation VARCHAR(255) NOT NULL,
    Status VARCHAR(50) CHECK (Status IN ('Ongoing', 'Completed', 'Cancelled')) DEFAULT 'Ongoing',
    Fare DECIMAL(10,2) NOT NULL,
    SurgeMultiplier DECIMAL(3,2) DEFAULT 1.0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Bookings (
    BookingID SERIAL PRIMARY KEY,
    ClientID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    VehicleID INT REFERENCES Vehicles(VehicleID) ON DELETE CASCADE,
    Status VARCHAR(50) CHECK (Status IN ('Scheduled', 'Completed', 'Cancelled')) DEFAULT 'Scheduled',
    ScheduledTime TIMESTAMP NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BookingPricing (
    PricingID SERIAL PRIMARY KEY,
    BookingID INT REFERENCES Bookings(BookingID) ON DELETE CASCADE,
    BaseFare DECIMAL(10,2) NOT NULL,
    SurgeMultiplier DECIMAL(3,2) DEFAULT 1.0,
    FinalPrice DECIMAL(10,2) GENERATED ALWAYS AS (BaseFare * SurgeMultiplier) STORED
);

-- 4️⃣ Pricing & Payments
CREATE TABLE PaymentMethods (
    MethodID SERIAL PRIMARY KEY,
    MethodName VARCHAR(50) UNIQUE NOT NULL,
    Provider VARCHAR(50) NOT NULL
);

CREATE TABLE Payments (
    PaymentID SERIAL PRIMARY KEY,
    RideID INT REFERENCES Rides(RideID) ON DELETE CASCADE,
    Amount DECIMAL(10,2) NOT NULL,
    PaymentMethod INT REFERENCES PaymentMethods(MethodID) ON DELETE SET NULL,
    Status VARCHAR(50) CHECK (Status IN ('Pending', 'Completed', 'Failed')) DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SurgePricing (
    SurgeID SERIAL PRIMARY KEY,
    Zone VARCHAR(100) NOT NULL,
    TimeSlot VARCHAR(50) NOT NULL,
    Multiplier DECIMAL(3,2) NOT NULL
);

-- 5️⃣ Location & Zone Management
CREATE TABLE Locations (
    LocationID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Latitude DECIMAL(10,6) NOT NULL,
    Longitude DECIMAL(10,6) NOT NULL
);

CREATE TABLE RideZones (
    ZoneID SERIAL PRIMARY KEY,
    Name VARCHAR(100) UNIQUE NOT NULL,
    Boundaries TEXT NOT NULL,
    DemandLevel INT CHECK (DemandLevel BETWEEN 1 AND 5) DEFAULT 1
);

-- 6️⃣ Admin & Dispute Handling
CREATE TABLE AdminActions (
    ActionID SERIAL PRIMARY KEY,
    AdminID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    TargetUserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    ActionType VARCHAR(50) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Disputes (
    DisputeID SERIAL PRIMARY KEY,
    RideID INT REFERENCES Rides(RideID) ON DELETE CASCADE,
    UserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    Issue TEXT NOT NULL,
    Status VARCHAR(50) CHECK (Status IN ('Open', 'Resolved', 'Rejected')) DEFAULT 'Open',
    Resolution TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7️⃣ Promotions & Offers
CREATE TABLE PromoCodes (
    PromoID SERIAL PRIMARY KEY,
    Code VARCHAR(50) UNIQUE NOT NULL,
    DiscountType VARCHAR(50) CHECK (DiscountType IN ('Flat', 'Percentage')) NOT NULL,
    DiscountValue DECIMAL(10,2) NOT NULL,
    ExpiryDate DATE NOT NULL,
    UsageLimit INT NOT NULL
);

CREATE TABLE UserPromos (
    UserPromoID SERIAL PRIMARY KEY,
    UserID INT REFERENCES Users(UserID) ON DELETE CASCADE,
    PromoID INT REFERENCES PromoCodes(PromoID) ON DELETE CASCADE,
    UsedAt TIMESTAMP
);

-- 8️⃣ Analytics & Logs
CREATE TABLE Analytics (
    AnalyticsID SERIAL PRIMARY KEY,
    MetricName VARCHAR(100) NOT NULL,
    Value DECIMAL(15,6) NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE RideLogs (
    LogID SERIAL PRIMARY KEY,
    RideID INT REFERENCES Rides(RideID) ON DELETE CASCADE,
    Event TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BookingLogs (
    LogID SERIAL PRIMARY KEY,
    BookingID INT REFERENCES Bookings(BookingID) ON DELETE CASCADE,
    Event TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PaymentLogs (
    LogID SERIAL PRIMARY KEY,
    PaymentID INT REFERENCES Payments(PaymentID) ON DELETE CASCADE,
    Event TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
