-- ============================================================
-- CXO Orbit Global — Database Initialization Script
-- Run: mysql -u root -p < init.sql
-- ============================================================

--  CREATE DATABASE IF NOT EXISTS cxoorbit_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cxoorbit_db;

-- ─── Users ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            CHAR(36)     PRIMARY KEY,
  email         VARCHAR(191) NOT NULL UNIQUE,
  passwordHash  VARCHAR(255),
  firstName     VARCHAR(100) NOT NULL,
  lastName      VARCHAR(100) NOT NULL,
  phone         VARCHAR(20),
  role          ENUM('super_admin','admin','content_manager','finance','member','sponsor_partner') DEFAULT 'member',
  isActive      BOOLEAN      DEFAULT TRUE,
  isVerified    BOOLEAN      DEFAULT FALSE,
  isDeleted     BOOLEAN      DEFAULT FALSE,
  otpCode       VARCHAR(10),
  otpExpiresAt  DATETIME,
  lastLoginAt   DATETIME,
  createdAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Events ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id            CHAR(36)     PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  slug          VARCHAR(191) NOT NULL UNIQUE,
  description   TEXT,
  eventType     ENUM('conference','roundtable','webinar','hybrid','micro-conference') NOT NULL,
  status        ENUM('draft','published','cancelled','completed') DEFAULT 'draft',
  city          VARCHAR(100),
  venue         VARCHAR(255),
  address       TEXT,
  startDate     DATETIME,
  endDate       DATETIME,
  capacity      INT,
  isFeatured    BOOLEAN      DEFAULT FALSE,
  isPaid        BOOLEAN      DEFAULT FALSE,
  ticketPrice   DECIMAL(10,2),
  bannerImage   VARCHAR(500),
  agenda        JSON,
  isInviteOnly  BOOLEAN      DEFAULT TRUE,
  isDeleted     BOOLEAN      DEFAULT FALSE,
  createdBy     CHAR(36),
  createdAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Registrations / RSVP ────────────────────────────────
CREATE TABLE IF NOT EXISTS registrations (
  id            CHAR(36)     PRIMARY KEY,
  eventId       CHAR(36)     NOT NULL,
  userId        CHAR(36)     NOT NULL,
  status        ENUM('pending','confirmed','cancelled','attended','no_show') DEFAULT 'pending',
  rsvpResponse  ENUM('yes','no','maybe'),
  checkedInAt   DATETIME,
  notes         TEXT,
  createdAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_event_user (eventId, userId),
  FOREIGN KEY (eventId) REFERENCES events(id),
  FOREIGN KEY (userId)  REFERENCES users(id)
);

-- ─── Sponsors ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sponsors (
  id            CHAR(36)     PRIMARY KEY,
  companyName   VARCHAR(255) NOT NULL,
  contactName   VARCHAR(150),
  contactEmail  VARCHAR(255) NOT NULL,
  contactPhone  VARCHAR(20),
  website       VARCHAR(255),
  logo          VARCHAR(500),
  package       ENUM('title','gold','silver','bronze','associate'),
  status        ENUM('inquiry','active','inactive') DEFAULT 'inquiry',
  notes         TEXT,
  isDeleted     BOOLEAN      DEFAULT FALSE,
  createdAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Partners ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id            CHAR(36)     PRIMARY KEY,
  companyName   VARCHAR(255) NOT NULL,
  contactName   VARCHAR(150),
  contactEmail  VARCHAR(255) NOT NULL,
  partnerType   ENUM('strategic','media','technology','community'),
  website       VARCHAR(255),
  logo          VARCHAR(500),
  status        ENUM('inquiry','active','inactive') DEFAULT 'inquiry',
  notes         TEXT,
  isDeleted     BOOLEAN      DEFAULT FALSE,
  createdAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── CMS Pages ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cms_pages (
  id            CHAR(36)     PRIMARY KEY,
  slug          VARCHAR(191) NOT NULL UNIQUE,
  title         VARCHAR(255) NOT NULL,
  content       LONGTEXT,
  metaTitle     VARCHAR(255),
  metaDesc      VARCHAR(500),
  isPublished   BOOLEAN      DEFAULT FALSE,
  isDeleted     BOOLEAN      DEFAULT FALSE,
  updatedBy     CHAR(36),
  createdAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Email Logs ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_logs (
  id             CHAR(36)     PRIMARY KEY,
  recipientEmail VARCHAR(255) NOT NULL,
  subject        VARCHAR(255) NOT NULL,
  templateType   VARCHAR(100),
  body           TEXT,
  status         ENUM('pending','sent','failed') DEFAULT 'pending',
  errorMessage   TEXT,
  sentAt         DATETIME,
  relatedId      CHAR(36),
  createdAt      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── Seed: Default Admin User ─────────────────────────────
-- Password: Admin@1234  (bcrypt hash - change after first login!)
INSERT IGNORE INTO users (id, email, passwordHash, firstName, lastName, role, isActive, isVerified)
VALUES (
  UUID(),
  'admin@cxoorbitglobal.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TsIHCgLVHKBTH1eDCQH.jLXjnOky',
  'Super',
  'Admin',
  'super_admin',
  TRUE,
  TRUE
);

-- ─── Seed: Sample Events ──────────────────────────────────
INSERT IGNORE INTO events (id, title, slug, description, eventType, status, city, venue, startDate, endDate, isInviteOnly, isFeatured)
VALUES
  (UUID(), 'CXO Leadership Summit 2026', 'cxo-leadership-summit-2026',
   'An exclusive gathering of India\'s top CXO leaders for strategic insights and networking.', 
   'conference', 'published', 'Mumbai', 'Taj Lands End', '2026-03-15 09:00:00', '2026-03-15 18:00:00', TRUE, TRUE),
  (UUID(), 'CIO Roundtable: AI in Enterprise', 'cio-roundtable-ai-enterprise',
   'Invite-only roundtable for CIOs discussing practical AI adoption in large enterprises.',
   'roundtable', 'published', 'Pune', 'JW Marriott', '2026-04-10 10:00:00', '2026-04-10 14:00:00', TRUE, FALSE);

SELECT 'Database initialized successfully for CXO Orbit Global ✅' AS Status;
