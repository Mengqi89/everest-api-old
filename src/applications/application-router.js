const express = require('express');
const path = require('path');
const ApplicationsService = require('./application-service');
const { requireSchoolAuth } = require('../middleware/jwt-auth');

const applicationsRouter = express.Router();
const jsonBodyParser = express.json();

applicationsRouter.route('/').post(jsonBodyParser, (req, res, next) => {
  console.log(req.body);
  const newApplication = {
    job_id: req.body.job_id,
    school_id: req.body.school_id,
    teacher_id: req.body.teacher_id
  };

  for (const [key, value] of Object.entries(newApplication))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });

  ApplicationsService.insertApplication(req.app.get('db'), newApplication).then(
    application => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${application.id}`))
        .json(application);
    }
  );
});

applicationsRouter.route('/admin').get((req, res, next) => {
  ApplicationsService.getAllApplications(req.app.get('db'))
    .then(applications => res.json(applications))
    .catch(next);
});

applicationsRouter.route('/school').get(requireSchoolAuth, (req, res, next) => {
  const { id } = req.user;
  ApplicationsService.getApplicationsForSchool(req.app.get('db'), id)
    .then(applications => res.json(applications))
    .catch(next);
});

applicationsRouter
  .route('/:applicationId')
  .get((req, res, next) => {
    const { applicationId } = req.params;
    ApplicationsService.getApplicationById(req.app.get('db'), applicationId)
      .then(application => res.json(application))
      .catch(next);
  })
  .patch((req, res, next) => {
    const applicationId = req.params.applicationId;
    const { approvalStatus } = req.body;
    if (approvalStatus === true) {
      const newApplicationField = {
        application_approved: false
      };
      ApplicationsService.toggleAppApproval(
        req.app.get('db'),
        applicationId,
        newApplicationField
      )
        .then(numRowsAffected => res.json(numRowsAffected))
        .catch(next);
    } else {
      const newApplicationField = {
        application_approved: true
      };
      ApplicationsService.toggleAppApproval(
        req.app.get('db'),
        applicationId,
        newApplicationField
      )
        .then(numRowsAffected => res.json(numRowsAffected))
        .catch(next);
    }
  })
  .delete((req, res, next) => {
    const { applicationId } = req.params;
    ApplicationsService.deleteApplication(req.app.get('db'), applicationId)
      .then(numRowsAffected => {
        if (!numRowsAffected) {
          res
            .status(404)
            .json({ error: { message: "Application doesn't exist" } });
          next();
        }

        res.status(202).json(applicationId);
      })
      .catch(next);
  });

module.exports = applicationsRouter;
