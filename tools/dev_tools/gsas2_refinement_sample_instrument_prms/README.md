# GSASII refinement Sample and Instrument Parameters

gsas2_refinement_sample_instrument_prms is a galaxy tool with scripts written in python used to execute an Reitveld refinement in a GSASII project after changing the refinement settings for sample and isntrument parameters. 

## Main Features

- Takes a GSASII project as input from a previous stage of refinement

- contains all options from the instrument and sample parameters data tree from GSASII

- will complete a refinement and produce outputs for the next stage of refinement including
    - more plots for inspection
    - a GSAS project to pass to the next stage
    - the refinement lst

## Prerequisites 
- The upload_gsas2_refinement tool would ideally be used in the workflow at smoe point before this tool is used

## Usage 
- This tool is intended to be used as an intermediate stage of a GSAS2 refinement workflow, but can be used with suitable file inputs.
- this tool requires a GSASII gpx project file 
- this tool outputs:
    a GSASII gpx file
    a refinement lst file
    plots of the refinements

