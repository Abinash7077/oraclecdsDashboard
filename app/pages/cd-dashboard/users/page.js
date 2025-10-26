import { Textarea,Button } from "@mui/joy";

export default function UsersPage() {
  return (
    <>
      <div className="h-fit">
        <div className="h-[63vh]">

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
          <Button size="md" variant="solid" sx={{padding:"10px 40px"}} color="success">
          Update
        </Button>
          </div>
        </div>
      </div>
    </>
  );
}
