-- Seed existing portfolio projects (uses local /public/images paths)
-- Run after schema.sql. Safe to re-run: clears and re-inserts seed data.

DELETE FROM project_images;
DELETE FROM projects;

INSERT INTO projects (slug, title, category, tag, folder, description, cover_image_url, is_featured, featured_order, all_works_order) VALUES
  ('jani-chai', 'Jani Chai', 'Visual Identity / Packaging Design', 'tea brand', 'JANI', 'Premium tea brand packaging engineering and holistic visual identity mapping.', '/images/JANI/JANI1.jpg', true, 1, 1),
  ('raku-soda', 'RAKU Soda', 'Visual Identity / Packaging Design', 'Soda Cans', 'RAKU', 'Vibrant, high-saturation commercial soda can design and conceptual product lineup.', '/images/RAKU/Artboard 1.png', true, 2, 2),
  ('stone-wipes', 'STONE WIPES', 'Product Line Identity', 'Hand Lotion & Men''s Wipes', 'STONE', 'Minimalist slate-charcoal personal care tubes, wipe packets, and cosmetic presentation materials.', '/images/STONE/Artboard 1.png', true, 3, 5),
  ('inyange-industries', 'INYANGE INDUSTRIES', '', '', 'INYANGE', 'Industrial geometric juice brick carton lines and system consistency development.', '/images/INYANGE/INYANGE-INDUSTRIES-VISUALArtboard-1.png', false, 0, 3),
  ('supreme', 'SUPREME', '', '', 'SUPREME', 'Eco-pouch structure layout and bold commercial typographic identity systems for flour products.', '/images/SUPREME/PRESENTATIONArtboard-1.png', false, 0, 4),
  ('uhuru-clay-house', 'UHURU CLAY HOUSE', '', '', 'UHURU', 'Tactile integrated print collateral, flyer systems, and learning seminar campaign designs.', '/images/UHURU/Artboard 1.png', false, 0, 6);

-- Jani Chai gallery
INSERT INTO project_images (project_id, url, sort_order)
SELECT id, '/images/JANI/JANI' || n || '.jpg', n
FROM projects, generate_series(1, 9) AS n
WHERE slug = 'jani-chai';

-- RAKU gallery
INSERT INTO project_images (project_id, url, sort_order)
SELECT id, '/images/RAKU/Artboard ' || n || '.png', n
FROM projects, generate_series(1, 8) AS n
WHERE slug = 'raku-soda';

-- STONE gallery
INSERT INTO project_images (project_id, url, sort_order)
SELECT id, '/images/STONE/Artboard ' || n || '.png', n
FROM projects, generate_series(1, 6) AS n
WHERE slug = 'stone-wipes';

-- INYANGE gallery
INSERT INTO project_images (project_id, url, sort_order)
SELECT id, '/images/INYANGE/INYANGE-INDUSTRIES-VISUALArtboard-' || n || '.png', n
FROM projects, generate_series(1, 11) AS n
WHERE slug = 'inyange-industries';

-- SUPREME gallery
INSERT INTO project_images (project_id, url, sort_order)
SELECT id, '/images/SUPREME/PRESENTATIONArtboard-' || n || '.png', n
FROM projects, generate_series(1, 4) AS n
WHERE slug = 'supreme';

-- UHURU gallery
INSERT INTO project_images (project_id, url, sort_order)
SELECT id, '/images/UHURU/Artboard ' || n || '.png', n
FROM projects, generate_series(1, 10) AS n
WHERE slug = 'uhuru-clay-house';
