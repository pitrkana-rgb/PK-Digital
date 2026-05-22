import { ResponsiveWebpImage } from "../../../../components/ResponsiveWebpImage";
import {
  PROTOTYPE_PREVIEW_INTRINSIC,
  PROTOTYPE_PREVIEW_SIZES,
  prototypePreviewBasePath,
  PROTOTYPE_PREVIEW_WIDTHS,
} from "./prototypePreviewAssets";

type PrototypePreviewImageProps = {
  imageId: string;
  className: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export const PrototypePreviewImage = ({
  imageId,
  className,
  loading = "lazy",
  fetchPriority,
}: PrototypePreviewImageProps): JSX.Element => (
  <ResponsiveWebpImage
    basePath={prototypePreviewBasePath(imageId)}
    widths={PROTOTYPE_PREVIEW_WIDTHS}
    sizes={PROTOTYPE_PREVIEW_SIZES}
    width={PROTOTYPE_PREVIEW_INTRINSIC.width}
    height={PROTOTYPE_PREVIEW_INTRINSIC.height}
    className={className}
    loading={loading}
    fetchPriority={fetchPriority}
  />
);
