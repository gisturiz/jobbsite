import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import JobModal from './JobModal';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

export default function Jobs({ jobs }) {
    const classes = useStyles();
    const theme = useTheme();

    // modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, setJob] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    // pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50)
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    console.log('job is', jobs);
    

    return (
        <div>
            <div className="jobs">
                <JobModal open={open} job={selectedJob} handleClose={handleClose}/>
                <Typography variant="h4" component="h1">
                    Entry Level Software Jobs
            </Typography>
                <Typography variant="h6" component="h1">
                    Found {numJobs} Jobss
            </Typography>
                {
                    jobsOnPage.map(
                        (job, i) => <Job key={i} job={job} onClick={() => {
                            handleClickOpen();
                            setJob(job)
                        }}/>
                    )
                }
            </div>

            <div>
                Page {activeStep + 1} of {numPages}
            </div>

            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    )
}
