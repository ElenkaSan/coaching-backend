-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

-- INSERT INTO flightReservations (
--                        numberOfPassengers,
--                        location_departure,
--                        location_arrival,
--                        departureDate,
--                        returnDate,
--                        price,
--                        currency)
-- VALUES (1, 'JFK', 'MIA', '11/11/2025', '11/15/2025', 250, 'USD'),
--        (2, 'MIA', 'JFK', '12/21/2023', '12/27/2023', 150, 'EUR'),
--        (3, 'TMN', 'DME', '10/11/2024', '10/25/2024', 550, 'EUR'),
--        (4, 'BOS', 'MIA', '11/11/2022', '11/17/2022', 170, 'USD');


-- INSERT INTO hotelReservations (
--         hotelName,
--         roomType,
--         checkInDate,
--         checkOutDate,
--         numberOfGuests,  
--         roomsNumber,
--         price,
--         currency)
-- VALUES ('MIA', 'c', '12/21/2023', '12/27/2023', 1, 1, 250, 'USD'),
--        ('JFK', 'c', '11/11/2025', '11/15/2025', 1, 1, 130, 'USD'),
--        ('NYC', 'c', '12/11/2023', '12/15/2023', 2, 1, 140, 'USD'),
--        ('BOS', 'c', '11/11/2022', '11/17/2022', 2, 1, 170, 'USD');
