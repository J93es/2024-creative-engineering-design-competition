import { CedcAuthContext } from "App";
import { useContext } from "react";
import { railRobotFetchController } from "controller/index";
import { SetAlertDataContext } from "pages/body/Index";
import { MAX_LOCATION, SCALE } from "config/app-config";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "component/grafana.css";

export interface LocationType {
  location: number;
}

export const FormLocationSchema: z.ZodType<LocationType> = z.object({
  location: z
    .number({
      message: `0부터 ${MAX_LOCATION * SCALE}까지의 숫자를 입력하세요.`,
    })
    .int({
      message: `0부터 ${MAX_LOCATION * SCALE}까지의 숫자를 입력하세요.`,
    })
    .min(0, {
      message: `0부터 ${MAX_LOCATION * SCALE}까지의 숫자를 입력하세요.`,
    })
    .max(MAX_LOCATION, {
      message: `0부터 ${MAX_LOCATION * SCALE}까지의 숫자를 입력하세요.`,
    }),
});

function RailRobotControl() {
  const setAlertData = useContext(SetAlertDataContext);
  const authData = useContext(CedcAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationType>({ resolver: zodResolver(FormLocationSchema) });

  const onSubmit = (data: LocationType) => {
    const func = async () => {
      try {
        await railRobotFetchController.moveToTargeLocation(
          authData,
          data.location
        );

        setAlertData({
          message: "지정된 위치로 이동에 성공했습니다.",
          type: "SUCCESS",
        });
      } catch (error) {
        setAlertData({
          message: "지정된 위치로 이동에 실패했습니다.",
          type: "ERROR",
        });
      }
    };
    func();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group input-group mb-3">
          <label htmlFor="location"></label>
          <input
            id="location"
            type="number"
            className="form-control gf-bg-color-4 gf-text-color"
            placeholder={errors.location?.message ?? "위치를 입력하세요."}
            aria-describedby="button-submit-location"
            {...register("location", {
              setValueAs: (value) => Math.floor(Number((value || NaN) / SCALE)),
            })}
          />
          <button
            id="button-submit-location"
            className="btn btn-primary gf-bs-btn"
            type="submit"
          >
            지정된 위치로 이동
          </button>
        </div>
      </form>
      <button
        type="button"
        className="btn btn-primary gf-bs-btn m-2"
        onClick={async () => {
          try {
            await railRobotFetchController.patrolStart(authData);
            setAlertData({
              message: "순찰 시작에 성공했습니다.",
              type: "SUCCESS",
            });
          } catch (error) {
            setAlertData({
              message: "순찰 시작에 실패했습니다.",
              type: "ERROR",
            });
          }
        }}
      >
        순찰 시작
      </button>
    </div>
  );
}

export default RailRobotControl;
