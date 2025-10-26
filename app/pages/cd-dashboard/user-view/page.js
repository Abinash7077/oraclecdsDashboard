import { Textarea, Button } from "@mui/joy";
import { Grid, Box } from "@mui/material";

export default function UsersPage() {
  return (
    <div className="h-fit">
      <div className="h-[63vh]">
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={item}>
              <Box className="flex flex-col gap-2 mb-4">
                <label htmlFor={`name${item}`}>Name:</label>
                <input
                  type="text"
                  className="border-[1px] rounded h-[30px] border-solid border-gray-300 px-2"
                  id={`name${item}`}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="h-fit">
        <Textarea
          color="neutral"
          minRows={8}
          size="lg"
          variant="outlined"
          placeholder="Write your code here."
          sx={{
            bgcolor: "black",
            color: "white",
            borderColor: "gray",
            "&:hover": {
              borderColor: "lightgray",
            },
          }}
        />
        <div className="flex items-center justify-end mt-2">
          <Button
            size="md"
            variant="solid"
            sx={{ padding: "10px 40px" }}
            color="success"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}