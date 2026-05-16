-- ============================================================
--  Smart Campus Event Ticket Booking System
--  Database Setup Script
--  Database  : db
--  MySQL     : 8.x / 5.7+
--  Run this  : mysql -u root -p < database_setup.sql
-- ============================================================

-- 1. Create / select the database
CREATE DATABASE IF NOT EXISTS `db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `db`;

-- ============================================================
-- 2. TABLE: users
--    Mirrors com.eventbooking.model.User
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255) DEFAULT NULL,
    `email`      VARCHAR(255) DEFAULT NULL,
    `password`   VARCHAR(255) DEFAULT NULL,
    `department` VARCHAR(255) DEFAULT NULL,
    `role`       VARCHAR(50)  DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 3. TABLE: events
--    Mirrors com.eventbooking.model.Event
-- ============================================================
CREATE TABLE IF NOT EXISTS `events` (
    `id`                  BIGINT         NOT NULL AUTO_INCREMENT,
    `name`                VARCHAR(255)   DEFAULT NULL,
    `description`         TEXT           DEFAULT NULL,
    `guidelines`          TEXT           DEFAULT NULL,
    `category`            VARCHAR(255)   DEFAULT NULL,
    `participation_type`  VARCHAR(255)   DEFAULT NULL,
    `team_size`           INT            DEFAULT NULL,
    `registration_fee`    DOUBLE         DEFAULT NULL,
    `event_date`          DATE           DEFAULT NULL,
    `event_time`          TIME           DEFAULT NULL,
    `venue`               VARCHAR(255)   DEFAULT NULL,
    `available_tickets`   INT            DEFAULT NULL,
    `total_capacity`      INT            DEFAULT NULL,
    `organizer_contact`   VARCHAR(255)   DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 4. TABLE: bookings
--    Mirrors com.eventbooking.model.Booking
-- ============================================================
CREATE TABLE IF NOT EXISTS `bookings` (
    `id`                BIGINT    NOT NULL AUTO_INCREMENT,
    `user_id`           BIGINT    DEFAULT NULL,
    `event_id`          BIGINT    DEFAULT NULL,
    `number_of_tickets` INT       DEFAULT NULL,
    `total_amount`      DOUBLE    DEFAULT NULL,
    `booking_date`      DATETIME  DEFAULT NULL,
    `team_members`      TEXT      DEFAULT NULL,
    `team_emails`       TEXT      DEFAULT NULL,
    `team_name`         VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_booking_user`  FOREIGN KEY (`user_id`)  REFERENCES `users`(`id`),
    CONSTRAINT `fk_booking_event` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- 5. SAMPLE DATA: users
--
--    All passwords are BCrypt-hashed with strength 10.
--    Plain-text password for every account = Password@123
--    (BCrypt hash changes each time but any of these work with
--     Spring Security's BCryptPasswordEncoder)
--
--    ADMIN accounts  →  role = ROLE_ADMIN
--    STUDENT accounts → role = ROLE_STUDENT
-- ============================================================
INSERT INTO `users` (`name`, `email`, `password`, `department`, `role`) VALUES

-- ── ADMIN ACCOUNTS ──────────────────────────────────────────
('Admin User',
 'admin@campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Administration',
 'ROLE_ADMIN'),

('Event Coordinator',
 'coordinator@campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Event Management',
 'ROLE_ADMIN'),

-- ── STUDENT ACCOUNTS ────────────────────────────────────────
('Arun Kumar',
 'arun.kumar@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Computer Science',
 'ROLE_STUDENT'),

('Priya Sharma',
 'priya.sharma@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Electronics Engineering',
 'ROLE_STUDENT'),

('Rahul Mehta',
 'rahul.mehta@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Mechanical Engineering',
 'ROLE_STUDENT'),

('Sneha Reddy',
 'sneha.reddy@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Civil Engineering',
 'ROLE_STUDENT'),

('Vikram Singh',
 'vikram.singh@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Information Technology',
 'ROLE_STUDENT'),

('Divya Nair',
 'divya.nair@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Business Administration',
 'ROLE_STUDENT'),

('Karthik Raj',
 'karthik.raj@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Computer Science',
 'ROLE_STUDENT'),

('Meena Iyer',
 'meena.iyer@student.campus.edu',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHiy',
 'Electronics Engineering',
 'ROLE_STUDENT');


-- ============================================================
-- 6. SAMPLE DATA: events
--    All future-dated so they remain bookable after setup.
--    Fees: 0 for free events; > 0 for paid events.
-- ============================================================
INSERT INTO `events`
    (`name`, `description`, `guidelines`, `category`, `participation_type`,
     `team_size`, `registration_fee`, `event_date`, `event_time`,
     `venue`, `available_tickets`, `total_capacity`, `organizer_contact`)
VALUES

-- Event 1 – Technical Hackathon (Team)
('TechSpark Hackathon 2026',
 'A 24-hour campus hackathon where teams compete to build innovative tech solutions. Themes include AI, IoT, and sustainable tech.',
 '1. Teams of 2-4 members only.\n2. Bring your own laptops and chargers.\n3. Internet access will be provided.\n4. Plagiarism results in disqualification.\n5. Final submission via GitHub repository.',
 'Technical',
 'Team',
 4,
 200.00,
 '2026-06-15',
 '09:00:00',
 'Main Auditorium',
 100,
 100,
 'techspark@campus.edu | +91-9876543210'),

-- Event 2 – Cultural Fest (Individual)
('Spring Cultural Fiesta',
 'Annual cultural fest featuring dance, music, drama, and art competitions open to all departments.',
 '1. Individual participants only.\n2. Performance duration: 5 minutes max.\n3. No offensive content.\n4. Pre-register at least 3 days before the event.',
 'Cultural',
 'Individual',
 1,
 50.00,
 '2026-06-20',
 '10:00:00',
 'Open Air Theatre',
 200,
 200,
 'culturalclub@campus.edu | +91-9876543211'),

-- Event 3 – Technical Workshop (Individual, Free)
('Python & Machine Learning Workshop',
 'Hands-on workshop covering Python fundamentals, data analysis with Pandas, and building ML models using scikit-learn.',
 '1. Bring a laptop with Python 3.10+ pre-installed.\n2. Beginner-friendly – no prior ML experience needed.\n3. Certificates issued on completion.',
 'Workshop',
 'Individual',
 1,
 0.00,
 '2026-06-25',
 '10:00:00',
 'Seminar Hall - Block B',
 80,
 80,
 'csedept@campus.edu | +91-9876543212'),

-- Event 4 – Sports (Team)
('Inter-Department Cricket Tournament',
 'T20 format cricket tournament for all departments. Win trophies and certificates for top 3 teams.',
 '1. Teams of 11 players + 4 substitutes.\n2. Players must be enrolled students.\n3. Bring valid student ID.\n4. Tournament rules follow BCCI T20 format.',
 'Sports',
 'Team',
 11,
 300.00,
 '2026-07-01',
 '08:00:00',
 'Campus Cricket Ground',
 16,
 16,
 'sports@campus.edu | +91-9876543213'),

-- Event 5 – Seminar (Individual, Free)
('AI & Future of Work – Industry Seminar',
 'Distinguished industry leaders discuss how AI is reshaping careers, industries, and the future of human work.',
 '1. Open to all students and faculty.\n2. Q&A session at the end.\n3. Registration mandatory for seating.',
 'Seminar',
 'Individual',
 1,
 0.00,
 '2026-07-10',
 '02:00:00',
 'Conference Hall - Admin Block',
 150,
 150,
 'placements@campus.edu | +91-9876543214'),

-- Event 6 – Technical (Individual)
('Code Quest – Competitive Programming',
 'Individual competitive programming contest with problems across algorithmic complexity, data structures, and mathematics.',
 '1. Individual participation only.\n2. Duration: 3 hours.\n3. Allowed languages: C++, Java, Python.\n4. Online judge will be used for evaluation.',
 'Technical',
 'Individual',
 1,
 100.00,
 '2026-07-18',
 '01:00:00',
 'Computer Lab - Block A',
 60,
 60,
 'acm@campus.edu | +91-9876543215'),

-- Event 7 – Cultural (Team)
('Rythm & Beats – Group Dance Championship',
 'Group dance competition celebrating classical, folk, and contemporary styles. Prizes for top 3 groups.',
 '1. Groups of 5-10 members.\n2. Performance duration: 7-10 minutes.\n3. Props permitted – no fire or hazardous materials.\n4. Music tracks to be submitted 48 hrs before event.',
 'Cultural',
 'Team',
 10,
 150.00,
 '2026-07-25',
 '04:00:00',
 'Open Air Theatre',
 30,
 30,
 'culturalclub@campus.edu | +91-9876543216'),

-- Event 8 – Technical Workshop (Team)
('Robotics & Embedded Systems Workshop',
 'Two-day workshop on Arduino, Raspberry Pi, and building autonomous robots. Includes hands-on circuit building sessions.',
 '1. Teams of 2-3 members.\n2. All components provided by the organizer.\n3. Safety gear mandatory.\n4. Certificate of completion awarded to all participants.',
 'Workshop',
 'Team',
 3,
 500.00,
 '2026-08-05',
 '09:30:00',
 'Electronics Lab - Block C',
 40,
 40,
 'robotics@campus.edu | +91-9876543217'),

-- Event 9 – Quiz (Individual)
('Campus General Knowledge Quiz',
 'Test your knowledge across science, history, current affairs, and pop culture in this fun campus-wide quiz.',
 '1. Individual participation.\n2. Multiple rounds: written, rapid-fire, and audio-visual.\n3. No electronic devices during the quiz.',
 'Quiz',
 'Individual',
 1,
 30.00,
 '2026-08-12',
 '11:00:00',
 'Seminar Hall - Block D',
 100,
 100,
 'quiz@campus.edu | +91-9876543218'),

-- Event 10 – Photography (Individual, Free)
('Campus Photography Exhibition',
 'Showcase your photography skills. Submit up to 3 original photographs on the theme "Campus Life & Beyond".',
 '1. Original photos only – no AI-generated images.\n2. Submit high-resolution files (min 12MP) via online portal.\n3. Exhibition open to public for 3 days.\n4. Winners announced on Day 3.',
 'Arts',
 'Individual',
 1,
 0.00,
 '2026-08-20',
 '10:00:00',
 'Art Gallery - Main Block',
 120,
 120,
 'arts@campus.edu | +91-9876543219');


-- ============================================================
-- 7. SAMPLE DATA: bookings
--    Realistic bookings linking the students & events above.
--    user IDs: 3-10 (students), event IDs: 1-10
--    Adjust available_tickets accordingly.
-- ============================================================
INSERT INTO `bookings`
    (`user_id`, `event_id`, `number_of_tickets`, `total_amount`,
     `booking_date`, `team_members`, `team_emails`, `team_name`)
VALUES

-- Arun Kumar (3) → TechSpark Hackathon (1), 1 ticket (team of 1 leader)
(3, 1, 1, 200.00, '2026-05-10 10:30:00', 'Priya Sharma', 'priya.sharma@student.campus.edu', 'ByteBuilders'),

-- Priya Sharma (4) → Spring Cultural Fiesta (2), 1 ticket
(4, 2, 1, 50.00, '2026-05-11 11:00:00', NULL, NULL, NULL),

-- Rahul Mehta (5) → Python Workshop (3), 1 ticket (free)
(5, 3, 1, 0.00, '2026-05-12 09:15:00', NULL, NULL, NULL),

-- Sneha Reddy (6) → Python Workshop (3), 1 ticket (free)
(6, 3, 1, 0.00, '2026-05-12 10:00:00', NULL, NULL, NULL),

-- Vikram Singh (7) → Code Quest (6), 1 ticket
(7, 6, 1, 100.00, '2026-05-13 14:00:00', NULL, NULL, NULL),

-- Divya Nair (8) → AI Seminar (5), 1 ticket (free)
(8, 5, 1, 0.00, '2026-05-14 08:45:00', NULL, NULL, NULL),

-- Karthik Raj (9) → TechSpark Hackathon (1), 1 ticket
(9, 1, 1, 200.00, '2026-05-14 09:30:00', 'Meena Iyer', 'meena.iyer@student.campus.edu', 'CodeStorm'),

-- Meena Iyer (10) → Spring Cultural Fiesta (2), 1 ticket
(10, 2, 1, 50.00, '2026-05-15 11:30:00', NULL, NULL, NULL),

-- Arun Kumar (3) → Code Quest (6), 1 ticket
(3, 6, 1, 100.00, '2026-05-15 12:00:00', NULL, NULL, NULL),

-- Priya Sharma (4) → AI Seminar (5), 1 ticket (free)
(4, 5, 1, 0.00, '2026-05-16 13:00:00', NULL, NULL, NULL);


-- ============================================================
-- 8. Keep available_tickets consistent with bookings inserted
-- ============================================================
-- TechSpark Hackathon: 2 bookings  → 100 - 2 = 98
UPDATE `events` SET `available_tickets` = 98 WHERE `id` = 1;

-- Spring Cultural Fiesta: 2 bookings → 200 - 2 = 198
UPDATE `events` SET `available_tickets` = 198 WHERE `id` = 2;

-- Python Workshop: 2 bookings → 80 - 2 = 78
UPDATE `events` SET `available_tickets` = 78 WHERE `id` = 3;

-- AI Seminar: 2 bookings → 150 - 2 = 148
UPDATE `events` SET `available_tickets` = 148 WHERE `id` = 5;

-- Code Quest: 2 bookings → 60 - 2 = 58
UPDATE `events` SET `available_tickets` = 58 WHERE `id` = 6;


-- ============================================================
-- Done!  Verify with:
--   SELECT id, email, role FROM users;
--   SELECT id, name, event_date, available_tickets FROM events;
--   SELECT id, user_id, event_id, total_amount FROM bookings;
-- ============================================================
