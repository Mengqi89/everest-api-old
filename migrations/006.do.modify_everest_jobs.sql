ALTER TABLE everest_jobs
  ADD school_id INTEGER REFERENCES everest_schools(id) ON DELETE CASCADE;